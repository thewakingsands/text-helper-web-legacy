import React from 'react'
import { ISearchResult, ITextLine } from '../search/ITextLine'
import { NoResult } from './NoResult'
import { ResultTable } from './ResultTable'

export interface ISearchResultProps {
  keyword: string
  result: ISearchResult<ITextLine>
  onContextButtonClick: (item: ITextLine) => void
}

export function SearchResult(props: ISearchResultProps) {
  const resultCount = (props.result && props.result.total) || 0
  if (resultCount < 1) {
    return <NoResult keyword={props.keyword} />
  } else {
    return (
      <ResultTable
        onContextButtonClick={props.onContextButtonClick}
        result={props.result}
      />
    )
  }
}
