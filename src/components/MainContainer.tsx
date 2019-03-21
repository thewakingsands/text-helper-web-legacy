import React from 'react'
import styled from '@emotion/styled'
import { Classes } from '@blueprintjs/core'
import { FixedWidthContainer } from './FixedWidthContainer'

const PaddedDiv = styled.div({
  paddingTop: 50
})

const PaddedContainer = styled(FixedWidthContainer)({
  paddingTop: 12
})

export function MainContainer({ children }) {
  return (
    <PaddedDiv className={Classes.RUNNING_TEXT}>
      <PaddedContainer>{children}</PaddedContainer>
    </PaddedDiv>
  )
}
