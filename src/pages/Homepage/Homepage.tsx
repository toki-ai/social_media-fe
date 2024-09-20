import { Grid } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MiddlePart from './components/MiddlePart/MiddlePart'
import Reel from '../../components/Reels/Reels'
import ReelCreateForm from '../../components/Reels/ReelsCreateForm'
import Profile from '../../components/Profile/Profile'
import HomeRight from './components/HomeRight/HomeRight'
import SideBar from '../../components/Sidebar/Sidebar'

const Homepage = () => {
  return (
    <BrowserRouter>
      <div className='px-20'>
        <Grid container>
          <Grid item xs={0} lg={3} className='sticky top-0'>
            <SideBar />
          </Grid>
          <Grid
            item
            lg={location.pathname === '/' ? 6 : 9} // Show 6 columns for '/' path, 9 for others
            className='px-5 flex justify-center'
          >
            <Routes>
              <Route path='/' element={<MiddlePart />} />
              <Route path='/reels' element={<Reel />} />
              <Route path='/create-reel' element={<ReelCreateForm />} />
              <Route path='/profile/:id' element={<Profile />} />
            </Routes>
          </Grid>
          {/* Conditionally render HomeRight only on '/' */}
          {location.pathname === '/' && (
            <Grid item lg={3}>
              <HomeRight />
            </Grid>
          )}
        </Grid>
      </div>
    </BrowserRouter>
  )
}

export default Homepage
