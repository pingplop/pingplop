import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/libraries/auth-guard'

export default function AuthLayout() {
  const { authenticated } = useAuth()

  if (authenticated) {
    return <Navigate to='/-/overview' replace />
  }

  return (
    <div className='flex h-full min-h-screen flex-1 flex-col justify-center bg-gray-100 px-6 lg:px-8'>
      <Outlet />
    </div>
  )
}
