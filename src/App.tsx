import React, { useState } from 'react'
import { TopNav } from './components/TopNav'
import { MainContainer } from './components/MainContainer'
import { SearchField } from './components/SearchField'
import styled from '@emotion/styled'
import { Footer } from './components/Footer'
import { useSearch, ISearchQuery } from './search/useSearch'
import { SearchResult } from './components/SearchResult'
import { useDebouncedCallback } from 'use-debounce'
import { Spinner } from '@blueprintjs/core'

const MarginedDiv = styled.div({
  marginBottom: 12
})

const FillBodySection = styled.section({
  minHeight: '100%'
})

const Loading = styled(Spinner)({
  minHeight: 200
})

export default function App() {
  const [keywordInput, setKeywordInput] = useState('')
  const search = useSearch()

  const [debouncedSetSearch] = useDebouncedCallback(
    (q: ISearchQuery) => search.setSearch(q),
    400,
    []
  )

  const handleKeywordInputUpdate = (keyword: string) => {
    setKeywordInput(keyword)
    const query: ISearchQuery = {
      keyword: {
        keyword,
        page: 1,
        pageSize: 20
      }
    }
    debouncedSetSearch(query)
  }

  return (
    <>
      <TopNav />
      <FillBodySection>
        <MainContainer>
          <MarginedDiv>
            <SearchField
              keyword={keywordInput}
              onKeywordChange={handleKeywordInputUpdate}
            />
          </MarginedDiv>
          <MarginedDiv>
            {search.isLoading ? (
              <Loading />
            ) : (
              <SearchResult
                keyword={
                  search.query &&
                  search.query.keyword &&
                  search.query.keyword.keyword
                }
                result={search.result}
              />
            )}
          </MarginedDiv>
          <Footer />
        </MainContainer>
      </FillBodySection>
    </>
  )
}
