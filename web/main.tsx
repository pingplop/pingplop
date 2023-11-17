import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource-variable/noto-sans-hebrew'
import '@fontsource-variable/jetbrains-mono'

import { logHello } from './utils/logger'
import { App } from './app'

import './assets/styles/global.css'

logHello(import.meta.env.PROD)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
