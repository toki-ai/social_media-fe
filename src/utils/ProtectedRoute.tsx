import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = !!localStorage.getItem('jwt')

  return isAuthenticated ? <>{children}</> : <Navigate to='/login' />
}

export default ProtectedRoute
