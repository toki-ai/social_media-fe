import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideBar from '../components/Sidebar/Sidebar'
import { Box, Grid } from '@mui/material'
import { UserProvider } from '../context/userContext'

const AppLayout: React.FC = () => {
  const location = useLocation()

  const isMessagePage = location.pathname === '/messages'

  return (
    <UserProvider>
      <Box sx={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={0} lg={isMessagePage ? 0 : 2} sx={{ top: 0 }}>
            {!isMessagePage && <SideBar />}
          </Grid>
          <Grid
            item
            lg={isMessagePage ? 12 : 10}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box sx={isMessagePage ? { width: '100%' } : { width: '80%' }}>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </UserProvider>
  )
}

export default AppLayout
