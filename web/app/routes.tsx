import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import { AppLayout } from '@/components/layouts'
import ErrorNotFound from '@/pages/not-found'
import DefaultWebPage from '@/pages/welcome'

const AppRoutes = ({ basename }: { basename?: string }) => {
  const publicRoutes: RouteObject[] = [{ path: '/', element: <DefaultWebPage /> }]

  const protectedRoutes: RouteObject[] = [
    {
      element: <AppLayout />,
      children: [],
    },
  ]

  // Screen to handle error not found
  const notFoundRoute = { path: '*', element: <ErrorNotFound /> }

  // Combine and conditionally include routes based on authentication status
  const routes = [...publicRoutes, ...protectedRoutes, notFoundRoute]
  const router = createBrowserRouter(routes, { basename })

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default AppRoutes
