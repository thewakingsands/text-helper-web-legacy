import { useState, useEffect } from 'react'
import { ISearchResult, ITextLine } from './ITextLine'
import { IKeywordProps, linesByKeyword } from './linesByKeyword'
import { IFileLineProps, linesByFile } from './linesByFile'

export interface ISearchQuery {
  keyword?: IKeywordProps
  file?: IFileLineProps
}

export function useSearch() {
  const [result, setResult] = useState<ISearchResult<ITextLine>>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>(null)
  const [query, setQuery] = useState<ISearchQuery>(null)

  useEffect(() => {
    const abort = new AbortController()

    const fetchData = async () => {
      try {
        setIsLoading(true)
        if (query.keyword) {
          setResult(await linesByKeyword(query.keyword, abort.signal))
        } else if (query.file) {
          setResult(await linesByFile(query.file, abort.signal))
        } else {
          setResult(null)
        }
      } catch (e) {
        setError(e)
      } finally {
        setIsLoading(false)
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
