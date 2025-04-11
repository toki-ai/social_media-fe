import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)
  const [shouldNavigate, setShouldNavigate] = useState(false)
  const [shouldGoBack, setShouldGoBack] = useState(false)
  const location = useLocation()
  const isAuthenticated = !!localStorage.getItem('jwt')

  useEffect(() => {
    if (!isAuthenticated) {
      setOpen(true)
    }
  }, [isAuthenticated])

  const handleClose = () => {
    setOpen(false)
    setShouldGoBack(true)
  }

  const handleConfirm = () => {
    setOpen(false)
    setShouldNavigate(true)
  }

  if (shouldNavigate) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (shouldGoBack) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />
  }

  if (!isAuthenticated) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Authentication Required</DialogTitle>
        <DialogContent>
          <Typography>
            You need to be logged in to access this page. Do you want to proceed
            to login?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleConfirm} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
