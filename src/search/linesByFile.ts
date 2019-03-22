import { ITextLine, ISearchResult } from './ITextLine'
import { query } from './query'

export interface IFileLineProps {
  filename: string
  indexLower: number
  indexHigher: number
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
          },
          {
            range: {
              index: {
                gte: props.indexLower - 1,
                lt: props.indexHigher + 1
              }
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
    size: props.indexHigher - props.indexLower + 1
  })
  return resp.hits
}
