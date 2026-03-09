import React from 'react'
import { createRoot } from 'react-dom/client'

import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import './index.css'

import { FocusStyleManager } from '@blueprintjs/core'
import App from './App'

FocusStyleManager.onlyShowFocusOnTabs()

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root container #root was not found')
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
