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
  const resp = await query(
    {
      query: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        multi_match: {
          query: keyword,
          fields: ['cn^3', 'en^2', 'ja^1'],
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
    },
    signal
  )
  return resp.hits
}
