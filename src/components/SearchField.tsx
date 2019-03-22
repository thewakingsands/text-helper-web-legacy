import React from 'react'
import { InputGroup } from '@blueprintjs/core'

export function SearchField(props: {
  keyword: string
  onKeywordChange: (keyword: string) => void
}) {
  return (
    <InputGroup
      large
      value={props.keyword}
      onChange={e => props.onKeywordChange(e.target.value)}
      leftIcon="search"
      placeholder="中/英/日文搜索"
      autoFocus
    />
  )
}
