import { ITextLine, ISearchResult } from './ITextLine'
import { query } from './query'

export interface IFileLineProps {
  filename: string
  indexLower: number
  indexHigher: number
}

export async function linesByFile(
  props: IFileLineProps,
  signal?: AbortSignal
): Promise<ISearchResult<ITextLine>> {
  const resp = await query(
    {
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
                  gte: props.indexLower,
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
    },
    signal
  )
  return resp.hits
}
