import { ScreenSizeIndicator } from '@/components/common'
import { cn } from '@/utils/ui-helper'

import AppRoutes from './routes'

export function App() {
  return (
    <div className={cn('disable-select', 'h-full min-h-screen')}>
      <AppRoutes basename='/' />
      <ScreenSizeIndicator withScreenSize />
    </div>
  )
}
