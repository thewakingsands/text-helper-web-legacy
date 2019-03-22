import { useState, useEffect } from 'react'
import { ISearchResult, ITextLine } from './ITextLine'
import { IKeywordProps, linesByKeyword } from './linesByKeyword'

export interface ISearchQuery {
  keyword?: IKeywordProps
}

export function useSearch() {
  const [result, setResult] = useState<ISearchResult<ITextLine>>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error>(null)
  const [query, setQuery] = useState<ISearchQuery>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        if (query.keyword) {
          setResult(await linesByKeyword(query.keyword))
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
