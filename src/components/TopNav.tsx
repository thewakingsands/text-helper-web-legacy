import React, { useState } from 'react'
import {
  Navbar,
  Classes,
  Alignment,
  PopoverNext,
  Button,
  Menu,
  Alert,
  MenuItem,
  MenuDivider
} from '@blueprintjs/core'
import { copy } from '../utils/copy'
import { FixedWidthContainer } from './FixedWidthContainer'
import useLocalStorage from 'react-use-localstorage'
import { AdvancedUsage } from './AdvancedUsage'

const NEVERSHOW_KEY = 'neverShow'

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
  const [neverShow] = useLocalStorage(NEVERSHOW_KEY, '')
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <>
      <PopoverNext
        content={<MoreToolsMenu setShowAdvanced={setShowAdvanced} />}
        defaultIsOpen={!neverShow}
        placement="bottom-end"
        positioningStrategy="fixed"
        renderTarget={({ isOpen, ref, ...targetProps }) => (
          <Button
            {...targetProps}
            ref={ref}
            icon="more"
            intent="primary"
            aria-label="更多工具"
            active={isOpen}
          />
        )}
      />
      <Alert
        isOpen={showAdvanced}
        onClose={() => setShowAdvanced(false)}
        confirmButtonText="我知道了"
        intent="primary"
      >
        <AdvancedUsage />
      </Alert>
    </>
  )
}

const WIKI_USER_URL =
  'https://ff14.huijiwiki.com/wiki/%E7%94%A8%E6%88%B7:%E4%BA%91%E6%B3%BD%E5%AE%9B%E9%A3%8E'
const NEW_TEXT_HELPER_URL = 'https://strings.ffcafe.cn'

const MAP_URL = 'https://map.wakingsands.com'

function MoreToolsMenu(props: { setShowAdvanced: (state: boolean) => void }) {
  const [neverShow, setNeverShow] = useLocalStorage(NEVERSHOW_KEY, '')

  return (
    <Menu>
      <MenuItem
        icon="filter-list"
        text="高级搜索"
        onClick={() => props.setShowAdvanced(true)}
      />
      <MenuItem
        icon={neverShow ? 'tick' : 'square'}
        onClick={() => setNeverShow(neverShow ? '' : 'yes')}
        text="自动隐藏本菜单"
      />
      <MenuDivider title="其它工具" />
      <MenuItem text="新版文本检索" icon="search" onClick={() => open(NEW_TEXT_HELPER_URL)} />
      <MenuItem text="交互地图" icon="map" onClick={() => open(MAP_URL)} />
      <MenuDivider title="关于" />
      <MenuItem
        text="维基 用户:云泽宛风"
        icon="edit"
        onClick={() => open(WIKI_USER_URL)}
      />
      <MenuItem
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
  a.rel = 'noopener noreferrer'
  a.click()
}
