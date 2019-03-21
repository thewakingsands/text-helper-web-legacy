import React from 'react'
import {
  Navbar,
  Classes,
  Alignment,
  Popover,
  Button,
  Menu
} from '@blueprintjs/core'
import { copy } from '../utils/copy'
import { FixedWidthContainer } from './FixedWidthContainer'
import styled from '@emotion/styled-base'

export function TopNav() {
  return (
    <Navbar className={Classes.DARK} fixedToTop>
      <FixedWidthContainer>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>XIV 文本检索</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <MoreToolsButton />
        </Navbar.Group>
      </FixedWidthContainer>
    </Navbar>
  )
}

function MoreToolsButton() {
  return (
    <Popover content={<MoreToolsMenu />} defaultIsOpen autoFocus>
      <Button icon="more" intent="primary" />
    </Popover>
  )
}

const WIKI_USER_URL =
  'https://ff14.huijiwiki.com/wiki/%E7%94%A8%E6%88%B7:%E4%BA%91%E6%B3%BD%E5%AE%9B%E9%A3%8E'
const WEIBO_USER_URL = 'https://weibo.com/u/6364253854'

const MAP_URL = 'https://map.wakingsands.com'

function MoreToolsMenu() {
  return (
    <Menu>
      <Menu.Item disabled icon="code" text="数据版本：4.40" />
      <Menu.Divider title="其它工具" />
      <Menu.Item text="交互地图" icon="map" onClick={() => open(MAP_URL)} />
      <Menu.Divider title="关于" />
      <Menu.Item
        text="微博 @云泽宛风"
        icon="person"
        onClick={() => open(WEIBO_USER_URL)}
      />
      <Menu.Item
        text="维基 用户:云泽宛风"
        icon="edit"
        onClick={() => open(WIKI_USER_URL)}
      />
      <Menu.Item
        text="闲聊群 612370226"
        onClick={() => copy('612370226')}
        icon="chat"
      />
    </Menu>
  )
}

function open(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.rel = 'noopener'
  a.click()
}
