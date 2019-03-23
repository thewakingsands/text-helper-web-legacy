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
import { Pager } from './components/Pager'
import get from 'lodash/get'
import { ITextLine } from './search/ITextLine'
import { SearchError } from './components/SearchError'
import { SearchBar } from './components/SearchBar'
import { AdvancedUsage } from './components/AdvancedUsage'

const MarginedDiv = styled.div({
  marginBottom: 12
})

const FillBodySection = styled.section({
  minHeight: '100%'
})

const Loading = styled(Spinner)({
  minHeight: 200
})

const StickyContainer = styled.div({
  position: 'sticky',
  top: 5,
  zIndex: 20
})

export default function App() {
  const [keywordInput, setKeywordInput] = useState('')
  const [highlightItem, setHighlightItem] = useState<ITextLine>(null)
  const [previousQuery, setPreviousQuery] = useState<ISearchQuery>(null)

  // const search = useSearch({
  //   keyword: {
  //     keyword: '阿尔菲诺 塔塔露',
  //     page: 1,
  //     pageSize: 20
  //   }
  // })
  const search = useSearch(null)

  const [debouncedSetSearch] = useDebouncedCallback(
    (q: ISearchQuery) => {
      setHighlightItem(null)
      search.setSearch(q)
    },
    400,
    []
  )

  const PAGE_SIZE = 20

  const handleKeywordInputUpdate = (keyword: string) => {
    setKeywordInput(keyword)
    setPreviousQuery(null)
    const query: ISearchQuery = {
      keyword: {
        keyword,
        page: 1,
        pageSize: PAGE_SIZE
      }
    }
    debouncedSetSearch(query)
  }

  const handleContextClick = (item: ITextLine) => {
    if (keywordInput) {
      setPreviousQuery(search.query)
      setKeywordInput('')
    }

    setHighlightItem(item)

    search.setSearch({
      file: {
        filename: item.filename,
        indexLower: Math.max(0, item.index - 20),
        indexHigher: item.index + 20
      }
    })
  }

  const handleBackClick = () => {
    search.setSearch(previousQuery)
    setPreviousQuery(null)
    setKeywordInput(get(previousQuery, 'keyword.keyword'))
  }

  const page = get(search, ['query', 'keyword', 'page'], 0)
  const totalItems = get(search.result, ['total'], 0)
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)

  const pager = !search.isLoading && page > 0 && totalPages > 0 && (
    <MarginedDiv>
      <Pager current={page} total={totalPages} onPageChange={search.setPage} />
    </MarginedDiv>
  )

  return (
    <>
      <TopNav />
      <FillBodySection>
        <MainContainer>
          <StickyContainer>
            <MarginedDiv>
              <SearchBar
                previousQuery={previousQuery}
                keyword={keywordInput}
                onKeywordChange={handleKeywordInputUpdate}
                onBackClicked={handleBackClick}
              />
            </MarginedDiv>
          </StickyContainer>
          {pager}
          <MarginedDiv>
            {search.isLoading ? (
              <Loading />
            ) : search.error ? (
              <SearchError error={search.error} />
            ) : (
              <SearchResult
                keyword={
                  search.query &&
                  search.query.keyword &&
                  search.query.keyword.keyword
                }
                result={search.result}
                onContextButtonClick={handleContextClick}
                highlightItem={highlightItem}
              />
            )}
          </MarginedDiv>
          {pager}
          <Footer />
        </MainContainer>
      </FillBodySection>
    </>
  )
}
