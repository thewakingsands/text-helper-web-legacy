import { ITextLine, ISearchResult } from './ITextLine'
import { query } from './query'

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
  const resp = await query(
    {
      query: {
        bool: {
          must: [
            {
              // eslint-disable-next-line @typescript-eslint/camelcase
              multi_match: {
                query: keyword,
                fields: ['cn^3', 'en^2', 'ja^1'],
                type: 'phrase_prefix'
              }
            },
            {
              bool: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                must_not: {
                  match: {
                    filename: 'Completion.csv'
                  }
                }
              }
            }
          ]
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
    },
    signal
  )
  return resp.hits
}
