import ScreenSizeIndicator from '@/components/tw-indicator'
import { cn } from '@/utils/ui-helper'

import AppRoutes from './routes'

export function App() {
  return (
    <div className={cn('disable-select', 'h-full min-h-screen bg-gray-50')}>
      <AppRoutes basename='/' />
      <ScreenSizeIndicator withScreenSize />
    </div>
  )
}
