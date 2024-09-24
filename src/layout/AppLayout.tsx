import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideBar from '../components/Sidebar/Sidebar'
import { Box, Grid } from '@mui/material'

const AppLayout: React.FC = () => {
  const location = useLocation()

  const isMessagePage = location.pathname === '/messages'

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container>
        <Grid item xs={0} lg={2} className='sticky top-0'>
          {!isMessagePage && <SideBar />}
        </Grid>
        <Grid item lg={10} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '80%' }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AppLayout
