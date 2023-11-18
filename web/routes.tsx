import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import { AuthLayout, LoginPage } from '@/pages/auth'
import {
  AccountPage,
  AppLayout,
  BillingPage,
  HeartbeatPage,
  IncidentsPage,
  IntegrationsPage,
  ManageStatusPages,
  MonitoringPage,
  OverviewPage,
} from '@/pages/dashboard'
import ErrorNotFound from '@/pages/not-found'
import {
  PublicLayout,
  PublicPageIncidents,
  PublicPageMaintenance,
  PublicPageStatus,
} from '@/pages/statuspage'

const AppRoutes = ({ basename }: { basename?: string }) => {
  const publicRoutes: RouteObject[] = [
    {
      element: <PublicLayout />,
      children: [
        { path: '/', element: <PublicPageStatus /> },
        { path: '/maintenance', element: <PublicPageMaintenance /> },
        { path: '/incidents', element: <PublicPageIncidents /> },
      ],
    },
  ]

  const protectedRoutes: RouteObject[] = [
    {
      element: <AppLayout />,
      children: [
        { path: '/-/overview', element: <OverviewPage /> },
        { path: '/-/monitors', element: <MonitoringPage /> },
        { path: '/-/heartbeat', element: <HeartbeatPage /> },
        { path: '/-/incidents', element: <IncidentsPage /> },
        { path: '/-/pages', element: <ManageStatusPages /> },
        { path: '/-/integrations', element: <IntegrationsPage /> },
        { path: '/-/accounts', element: <AccountPage /> },
        { path: '/-/billing', element: <BillingPage /> },
      ],
    },
  ]

  const authRoutes: RouteObject[] = [
    {
      element: <AuthLayout />,
      children: [{ path: '/login', element: <LoginPage /> }],
    },
  ]

  // Public routes that do not require a specific layout
  const commonRoutes: RouteObject[] = [
    { path: '/-', element: <Navigate to='/-/overview' /> },
    { path: '*', element: <ErrorNotFound /> },
  ]

  // Combine and conditionally include routes based on authentication status
  const routes = [...publicRoutes, ...authRoutes, ...protectedRoutes, ...commonRoutes]
  const router = createBrowserRouter(routes, { basename })

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default AppRoutes
