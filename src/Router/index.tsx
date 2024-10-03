import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Message from '../pages/Message/Message'
import Profile from '../pages/Profile/Profile'
import Homepage from '../pages/Homepage/HomePage'
import Authentication from '../pages/Authentication/Authentication'
import AppLayout from '../layout/AppLayout'
import ErrorPage from '../pages/ErrorPage'
import PostDetail from '../pages/PostDetail/PostDetail'
import ReelsPage from '../pages/ReelsPage/ReelsPage'
import CreateReels from '../pages/CreateReels/CreateReels'

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
      { path: '/post/:id', element: <PostDetail /> },
      { path: '/profile/:id', element: <Profile /> },
      { path: '/reels', element: <ReelsPage /> },
      { path: '/reels/create', element: <CreateReels /> },
      {
        path: '/profile',
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
