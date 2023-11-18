import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import { EmptySlot } from '@/components/common'
import { AppLayout, AuthLayout, HomeLayout } from '@/components/layouts'
import DashboardPage from '@/pages/dashboard'
import LoginPage from '@/pages/login'
import ErrorNotFound from '@/pages/not-found'
import { PublicPageIncidents, PublicPageMaintenance, PublicPageStatus } from '@/pages/statuspage'

const AppRoutes = ({ basename }: { basename?: string }) => {
  const publicRoutes: RouteObject[] = [
    {
      element: <HomeLayout />,
      children: [
        { path: '/', element: <PublicPageStatus /> },
        { path: '/maintenance', element: <PublicPageMaintenance /> },
        { path: '/incidents', element: <PublicPageIncidents /> },
      ],
    },
  ]

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
        { path: '/-/overview', element: <DashboardPage /> },
        { path: '/-/monitors', element: <EmptySlot /> },
        { path: '/-/heartbeat', element: <EmptySlot /> },
        { path: '/-/incidents', element: <EmptySlot /> },
        { path: '/-/status-page', element: <EmptySlot /> },
        { path: '/-/integrations', element: <EmptySlot /> },
        { path: '/-/account/billing', element: <EmptySlot /> },
      ],
    },
  ]

  // Screen to handle error not found
  const notFoundRoute = { path: '*', element: <ErrorNotFound /> }

  // Combine and conditionally include routes based on authentication status
  const routes = [...publicRoutes, ...authRoutes, ...protectedRoutes, notFoundRoute]
  const router = createBrowserRouter(routes, { basename })

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default AppRoutes
