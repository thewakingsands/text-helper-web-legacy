import React from 'react'
import { InputGroup } from '@blueprintjs/core'

export function SearchField() {
  return (
    <InputGroup
      large
      leftIcon="search"
      placeholder="中/英/日文搜索"
      autoFocus
    />
  )
}
