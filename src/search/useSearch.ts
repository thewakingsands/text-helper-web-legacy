import { useState, useEffect } from 'react'
import { ISearchResult, ITextLine } from './ITextLine'
import { IKeywordProps, linesByKeyword } from './linesByKeyword'
import { IFileLineProps, linesByFile } from './linesByFile'

export interface ISearchQuery {
  keyword?: IKeywordProps
  file?: IFileLineProps
}

export function useSearch(initialQuery: ISearchQuery) {
  const [result, setResult] = useState<ISearchResult<ITextLine>>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>(null)
  const [query, setQuery] = useState<ISearchQuery>(initialQuery)

  useEffect(() => {
    const abort = new AbortController()

    const fetchData = async () => {
      try {
        setError(null)
        setIsLoading(true)
        if (query) {
          if (query.keyword) {
            setResult(await linesByKeyword(query.keyword, abort.signal))
          } else if (query.file) {
            setResult(await linesByFile(query.file, abort.signal))
          } else {
            setResult(null)
          }
        }
      } catch (e) {
        if (e && e.name !== 'AbortError') {
          setError(e)
        }
      } finally {
        if (!abort.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => abort.abort()
  }, [query])

  const setSearch = (query: ISearchQuery) => {
    setQuery(query)
  }

  const setPage = (page: number) => {
    if (query.keyword) {
      setQuery({ keyword: { ...query.keyword, page: page } })
    }
  }

  return { result, query, isLoading, error, setSearch, setPage }
}
