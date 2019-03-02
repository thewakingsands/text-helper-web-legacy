const endpoint = localStorage.endpoint || (location.hostname === 'localhost' ? 'http://localhost:9200/xivcsv' : '/xivcsv')

const app = new Vue({
  el: '#app',
  data: {
    query: '',
    results: [],
    total: 0,
    pages: 0,
    highlightLine: -1,
    loading: false
  },
  methods: {
    async search() {
      const query = this.query
      if (!query) {
        this.results = []
        return
      }
      this.loading = true
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
      this.loading = false
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
    },
    cleanFilename(s) {
      return s && s.replace(/\.csv$/, '')
    }
  },
  watch: {
    query() {
      this.search()
    }
  }
})

async function searchByKeyword(query, pageSize, page) {
  const resp = await fetch(`${endpoint}/_search`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: {
        multi_match: {
          query,
          fields: ["cn^3","en^2","ja^1"],
          type: 'phrase_prefix'
        }
      },
      from: pageSize * (page - 1),
      size: pageSize,
      highlight: {
        fields: {
          en: {},
          cn: {},
          ja: {}
        }
      }
    })
  })
  const json = await resp.json()
  return {
    total: json.hits.total,
    pages: Math.ceil(json.hits.total / pageSize),
    results: json.hits.hits.map(h => {
      const result =  {
        ...h._source
      }
      for (const lang of ['cn', 'en', 'ja']) {
        result[`${lang}h`] = highlight(h, lang)
      }
      return result
    })
  }
}

async function searchByFilename(filename, lineno) {
  const url = new URL(`${endpoint}/_search`, location.href)
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

function highlight(h, lang) {
  const html = h.highlight && h.highlight[lang] && h.highlight[lang][0]
  if (!html) {
    return undefined
  }
  return html.replace(/\t/g, '\n')
    .replace(/<(?!\/?em)([^>]+)>/, '&lt;$1&gt;')
    .replace(/<(?!\/?em)/, '&lt;')
}
