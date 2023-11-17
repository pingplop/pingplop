import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import { EmptySlot } from '@/components/common'
import { AppLayout, AuthLayout } from '@/components/layouts'
import DashboardPage from '@/pages/dashboard'
import LoginPage from '@/pages/login'
import ErrorNotFound from '@/pages/not-found'

const AppRoutes = ({ basename }: { basename?: string }) => {
  const authenticated = false
  const redirectTo = authenticated ? '/overview' : '/login'

  const homeRoute: RouteObject = { path: '/', element: <Navigate to={redirectTo} replace /> }

  const authRoutes: RouteObject[] = [
    {
      element: <AuthLayout />,
      children: [{ path: '/login', element: <LoginPage /> }],
    },
  ]

  const protectedRoutes: RouteObject[] = [
    {
      element: <AppLayout />,
      children: [
        { path: '/overview', element: <DashboardPage /> },
        { path: '/monitors', element: <EmptySlot /> },
        { path: '/heartbeat', element: <EmptySlot /> },
        { path: '/incidents', element: <EmptySlot /> },
        { path: '/status-page', element: <EmptySlot /> },
        { path: '/integrations', element: <EmptySlot /> },
        { path: '/account/billing', element: <EmptySlot /> },
      ],
    },
  ]

  // Screen to handle error not found
  const notFoundRoute = { path: '*', element: <ErrorNotFound /> }

  // Combine and conditionally include routes based on authentication status
  const routes = [homeRoute, ...authRoutes, ...protectedRoutes, notFoundRoute]
  const router = createBrowserRouter(routes, { basename })

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default AppRoutes
