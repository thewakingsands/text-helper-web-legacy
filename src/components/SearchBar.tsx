import React from 'react'
import styled from '@emotion/styled'
import { ISearchFieldProps, SearchField } from './SearchField'
import { ISearchQuery } from '../search/useSearch'
import { Button } from '@blueprintjs/core'

const Container = styled.div({
  display: 'flex'
})

export interface ISearchBarProps extends ISearchFieldProps {
  previousQuery?: ISearchQuery
  onBackClicked?: () => void
}

export function SearchBar(props: ISearchBarProps) {
  const kw =
    props.previousQuery &&
    props.previousQuery.keyword &&
    props.previousQuery.keyword.keyword
  const text = kw && `返回搜索“${kw}”`

  return (
    <Container>
      {props.previousQuery && (
        <Button
          onClick={() => props.onBackClicked()}
          text={text}
          large
          icon="chevron-left"
          intent="primary"
          style={{ marginRight: 12 }}
        />
      )}
      <div style={{ flex: 1 }}>
        <SearchField {...props} />
      </div>
    </Container>
  )
}
