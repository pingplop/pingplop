import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className='flex h-full min-h-screen flex-1 flex-col justify-center bg-gray-100 px-6 lg:px-8'>
      <Outlet />
    </div>
  )
}
