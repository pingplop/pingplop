import React from 'react'
import ReactDOM from 'react-dom/client'

import ScreenSizeIndicator from '@/components/tw-indicator'
import { AuthProvider } from '@/libraries/auth-guard'
import { logHello } from '@/utils/logger'
import { cn } from '@/utils/ui-helper'

import AppRoutes from './routes'

import './assets/styles/global.css'

logHello(import.meta.env.PROD)

export function App() {
  return (
    <div className={cn('disable-select', 'h-full min-h-screen bg-gray-50')}>
      <AuthProvider authStorage='localstorage'>
        <AppRoutes basename='/' />
      </AuthProvider>
      <ScreenSizeIndicator withScreenSize />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
