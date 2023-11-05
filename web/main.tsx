import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource-variable/noto-sans-hebrew'
import '@fontsource-variable/jetbrains-mono'

import { App } from './app'

import './assets/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
