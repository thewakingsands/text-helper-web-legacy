import React from 'react'
import { NonIdealState } from '@blueprintjs/core'
import styled from '@emotion/styled'

const StyledNonIdealState = styled(NonIdealState)({
  paddingBottom: 20
})

export function NoResult(props: { keyword: string }) {
  return (
    <StyledNonIdealState
      icon="search"
      description={
        props.keyword ? `没有找到“${props.keyword}”` : '请输入关键字'
      }
    />
  )
}
