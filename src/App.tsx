import React from 'react'
import { TopNav } from './components/TopNav'
import { MainContainer } from './components/MainContainer'
import { SearchField } from './components/SearchField'
import { Classes, NonIdealState } from '@blueprintjs/core'
import styled from '@emotion/styled'
import { NoResult } from './components/NoResult'

const MarginedDiv = styled.div({
  marginBottom: 12
})

const FillBodySection = styled.section({
  minHeight: '100%'
})

export default function App() {
  return (
    <>
      <TopNav />
      <FillBodySection>
        <MainContainer>
          <MarginedDiv>
            <SearchField />
          </MarginedDiv>
          <MarginedDiv>
            <NoResult keyword="" />
          </MarginedDiv>
          <footer>
            <p className={`${Classes.TEXT_MUTED} ${Classes.TEXT_SMALL}`}>
              FINAL FANTASY is a registered trademark of Square Enix Holdings
              Co., Ltd.
              <br />
              Copyrighted Materials are extracted from FINAL FANTASY XIV © 2010
              - 2019 SQUARE ENIX CO., LTD. All Rights Reserved.
            </p>
          </footer>
        </MainContainer>
      </FillBodySection>
    </>
  )
}
