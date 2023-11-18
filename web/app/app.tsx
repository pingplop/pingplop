import ScreenSizeIndicator from '@/components/tw-indicator'
import { AuthProvider } from '@/libraries/auth-guard'
import { cn } from '@/utils/ui-helper'

import AppRoutes from './routes'

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
