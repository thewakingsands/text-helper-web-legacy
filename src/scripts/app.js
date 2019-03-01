const endpoint = 'http://localhost:9200/xivcsv'

const app = new Vue({
  el: '#app',
  data: {
    query: '',
    results: [],
    total: 0,
    pages: 0,
    highlightLine: -1
  },
  methods: {
    async search() {
      const query = this.query
      if (!query) {
        this.results = []
        return
      }
      let searchResult
      if (query[0] === ':') {
        const [, filename, lineno] = query.split(':')
        this.highlightLine = parseInt(lineno)
        searchResult = await searchByFilename(filename, lineno)
      } else {
        this.highlightLine = -1
        searchResult = await searchByKeyword(query, 30, 1)
      }
      if (query !== this.query) return
      this.results = searchResult.results
      this.total = searchResult.total
      this.pages = searchResult.pages
      if (this.highlightLine > 0) {
        Vue.nextTick(() => {
          document.querySelector('tr.highlight').scrollIntoView()
        })
      }
    },
    async file(filename, lineno) {
      this.query = `:${filename}:${lineno}`
    }
  },
  filters: {
    tToN(s) {
      return s && s.replace(/\t/g, '\n11')
    }
  },
  watch: {
    query() {
      this.search()
    }
  }
})

async function searchByKeyword(query, pageSize, page) {
  const queryJ = JSON.stringify(query)
  const resp = await fetch(`${endpoint}/_search`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: `{"query":{"bool":{"must":[{"bool":{"must":[{"bool":{"should":[{"multi_match":{"query":${queryJ},"fields":["cn^3","en^3","ja^3","cn.raw^3","en.raw^3","ja.raw^3","cn.search^1","en.search^1","ja.search^1","cn.autosuggest^1","en.autosuggest^1","ja.autosuggest^1","_id^1"],"type":"cross_fields","operator":"and"}},{"multi_match":{"query":${queryJ},"fields":["cn^3","en^3","ja^3","cn.raw^3","en.raw^3","ja.raw^3","cn.search^1","en.search^1","ja.search^1","cn.autosuggest^1","en.autosuggest^1","ja.autosuggest^1","_id^1"],"type":"phrase_prefix","operator":"and"}}],"minimum_should_match":"1"}}]}}]}},"size":${pageSize},"_source":{"includes":["*"],"excludes":[]},"from":${pageSize * (page - 1)},"sort":[{"_score":{"order":"desc"}}],"highlight":{"fields":{"en":{},"cn":{},"ja":{}}}}`
  })
  const json = await resp.json()
  return {
    total: json.hits.total,
    pages: Math.ceil(json.hits.total / pageSize),
    results: json.hits.hits.map(h => {
      const result =  {
        ...h._source
      }
      if (h.highlight && h.highlight.cn && h.highlight.cn[0]) {
        result.cnh = h.highlight.cn[0].replace(/\t/g, '\n')
      }
      if (h.highlight && h.highlight.en && h.highlight.en[0]) {
        result.enh = h.highlight.en[0].replace(/\t/g, '\n')
      }
      if (h.highlight && h.highlight.ja && h.highlight.ja[0]) {
        result.jah = h.highlight.ja[0].replace(/\t/g, '\n')
      }
      return result
    })
  }
}

async function searchByFilename(filename, lineno) {
  const url = new URL(`${endpoint}/_search`)
  const body = {
    query: {
      bool: {
        must: [
          {
            match: {
              filename: filename
            }
          },
          {
            range: {
              index: {
                gte: lineno - 20,
                lt: lineno + 40
              }
            }
          }
        ]
      }
    },
    sort: [{
      index: {order: 'asc'}
    }],
    size: 220
  }

  const resp = await fetch(url, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const json = await resp.json()

  return {
    total: json.hits.total,
    pages: 1,
    results: json.hits.hits.map(h => h._source)
  }
}
