import React from 'react'
import { ISearchResult, ITextLine } from '../search/ITextLine'
import { NoResult } from './NoResult'

export interface ISearchResultProps {
  keyword: string
  result: ISearchResult<ITextLine>
}

export function SearchResult(props: ISearchResultProps) {
  const resultCount = (props.result && props.result.total) || 0

  if (resultCount < 1) {
    return <NoResult keyword={props.keyword} />
  } else {
    return (
      <div>
        <p>共找到结果{props.result.total}条。</p>
      </div>
    )
  }
}
