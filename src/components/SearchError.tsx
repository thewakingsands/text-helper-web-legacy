import React from 'react'
import { StyledNonIdealState } from './StyledNonIdealState'
import styled from '@emotion/styled'
import { Colors } from '@blueprintjs/core'

const ErrorNonIdealState = styled(StyledNonIdealState)({
  '.bp3-icon': {
    color: Colors.RED3
  }
})

export function SearchError(props: { error: Error }) {
  return <ErrorNonIdealState icon="error" description={props.error.message} />
}
