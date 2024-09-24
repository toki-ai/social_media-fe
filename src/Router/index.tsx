import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../utils/ProtectedRoute'
import Message from '../pages/Message/Message'
import Profile from '../components/Profile/Profile'
import Homepage from '../pages/Homepage'
import Authentication from '../pages/Authentication/Authentication'
import AppLayout from '../layout/AppLayout'
import ErrorPage from '../pages/ErrorPage'

const publicRoutes = [
  { path: '/login', element: <Authentication /> },
  { path: '/register', element: <Authentication /> },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Homepage /> },
      {
        path: '/profile/*',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/messages',
        element: (
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        ),
      },
    ],
  },
  ...publicRoutes,
  { path: '*', element: <ErrorPage /> },
])

export default router
