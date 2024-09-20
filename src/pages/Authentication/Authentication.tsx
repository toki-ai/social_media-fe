import { Card, Grid2 } from '@mui/material'
import backgroundImage from '/assets/sceen.jpg'
import Login from './Login'
import Register from './Register'

const Authentication = () => {
  return (
    <div>
      <Grid2 container className='w-screen'>
        <Grid2 size={7} className='h-screen overflow-hidden'>
          <img
            className='h-full w-full object-cover'
            src={backgroundImage}
            alt='background'
          />
        </Grid2>
        <Grid2 size={5} className='h-screen overflow-hidden'>
          <div className='px-20 flex flex-col justify-center h-full'>
            <Card className='card p-8'>
              <div className='flex flex-col items-center mb-5 space-y-1'>
                <h1 className='log'>Your Hometown</h1>
                {location.pathname === '/register' ? <Register /> : <Login />}
              </div>
            </Card>
          </div>
        </Grid2>
      </Grid2>
    </div>
  )
}

export default Authentication
