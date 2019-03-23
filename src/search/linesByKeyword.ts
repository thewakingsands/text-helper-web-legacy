import { ITextLine, ISearchResult } from './ITextLine'
import { query } from './query'
import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'

/* eslint-disable @typescript-eslint/camelcase */

export interface IKeywordProps {
  keyword: string
  pageSize: number
  page: number
}

export async function linesByKeyword(
  { keyword, pageSize, page }: IKeywordProps,
  signal?: AbortSignal
): Promise<ISearchResult<ITextLine>> {
  if (!keyword) {
    return null
  }

  const esQuery = searchKeywordQuery(keyword)

  const resp = await query(
    {
      query: esQuery,
      from: pageSize * (page - 1),
      size: pageSize,
      highlight: {
        fields: {
          en: {},
          cn: {},
          ja: {}
        }
      }
    },
    signal
  )
  return resp.hits
}

function parseInput(input: string) {
  if (input.startsWith('(') && input.endsWith(')')) {
    return [
      {
        must: [
          {
            simple_query_string: {
              query: input,
              fields: ['cn^3', 'en^2', 'ja^1'],
              default_operator: 'and'
            }
          }
        ]
      }
    ]
  }

  const params = splitBySpace(input)
    .map(s => s.trim())
    .filter(s => s)

  const queryGroup = []
  const plainKeywords = []

  for (const param of params) {
    const special = parseSpecialInput(param)
    if (special) {
      queryGroup.push(special)
    } else {
      plainKeywords.push(param)
    }
  }

  for (const keyword of plainKeywords) {
    queryGroup.push({ should: [multiMatchQuery(keyword, 8)] })
  }

  return queryGroup
}

function parseSpecialInput(input: string) {
  if (input.startsWith('-')) {
    return {
      must_not: [multiMatchQuery(input.substr(1))]
    }
  }
  if (input.startsWith('filename:')) {
    const [, filename] = input.split('filename:')
    return {
      filter: [
        {
          wildcard: {
            filename: `*${filename}*`
          }
        }
      ]
    }
  }
  if (input.startsWith('"') && input.endsWith('"')) {
    const keyword = input.substr(1, input.length - 2)
    return {
      filter: [
        {
          multi_match: {
            query: keyword,
            fields: ['cn^3', 'en^2', 'ja^1'],
            type: 'phrase'
          }
        }
      ]
    }
  }
  return null
}

function searchKeywordQuery(keyword: string) {
  return {
    bool: mergeQuery(defaultQuery(), ...parseInput(keyword))
  }
}

function defaultQuery() {
  return {
    must_not: [ignoredFileuery()]
  }
}

function ignoredFileuery() {
  return {
    match: {
      filename: 'Completion.csv'
    }
  }
}

function multiMatchQuery(keyword: string, boost = 1) {
  return {
    function_score: {
      query: {
        multi_match: {
          query: keyword,
          fields: ['cn^3', 'en^2', 'ja^1'],
          // type: 'phrase_prefix',
          fuzziness: 'AUTO'
        }
      },
      boost,
      boost_mode: 'multiply'
    }
  }
}

function customMerge(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

function mergeQuery(...params) {
  return mergeWith.call(null, ...params, customMerge)
}

function splitBySpace(str: string): string[] {
  // https://stackoverflow.com/a/18647776

  // The parenthesis in the regex creates a captured group within the quotes
  var myRegexp = /[^\s"]+|"([^"]*)"/gi
  var myArray = []

  do {
    // Each call to exec returns the next regex match as an array
    var match = myRegexp.exec(str)
    if (match !== null) {
      // Index 1 in the array is the captured group if it exists
      // Index 0 is the matched text, which we use if no captured group exists
      myArray.push(match[1] ? `"${match[1]}"` : match[0])
    }
  } while (match !== null)

  return myArray
}
