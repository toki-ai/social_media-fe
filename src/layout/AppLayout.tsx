import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideBar from '../components/Sidebar/Sidebar'
import { Grid } from '@mui/material'

const AppLayout: React.FC = () => {
  const location = useLocation()

  const isMessagePage = location.pathname === '/messages'

  return (
    <div className='w-full'>
      <Grid container>
        <Grid item xs={0} lg={2} className='sticky top-0'>
          {!isMessagePage && <SideBar />}
        </Grid>
        <Grid item lg={10} sx={{ display: 'flex', justifyContent: 'center' }}>
          <div className='w-[80%]'>
            <Outlet />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default AppLayout
