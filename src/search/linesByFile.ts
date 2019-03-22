import { ITextLine, ISearchResult } from './ITextLine'
import { query } from './query'

export interface IFileLineProps {
  filename: string
  pageSize: number
  page: number
}

export async function linesByFile(
  props: IFileLineProps
): Promise<ISearchResult<ITextLine>> {
  const resp = await query({
    query: {
      bool: {
        must: [
          {
            match: {
              filename: props.filename
            }
          }
        ]
      }
    },
    sort: [
      {
        index: { order: 'asc' }
      }
    ],
    from: props.pageSize * (props.page - 1),
    size: props.pageSize
  })
  return resp.hits
}
