import React, { CSSProperties } from 'react'
import { InputGroup, Button } from '@blueprintjs/core'

export interface ISearchFieldProps {
  keyword: string
  onKeywordChange: (keyword: string) => void
  className?: string
  style?: CSSProperties
}

export function SearchField(props: ISearchFieldProps) {
  return (
    <InputGroup
      className={props.className}
      large
      value={props.keyword}
      onChange={e => props.onKeywordChange(e.target.value)}
      leftIcon="search"
      placeholder="中/英/日文搜索"
      autoFocus
      rightElement={
        props.keyword && (
          <Button
            icon="small-cross"
            minimal
            onClick={() => props.onKeywordChange('')}
          />
        )
      }
    />
  )
}
