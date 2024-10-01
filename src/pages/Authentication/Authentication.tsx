import { Box, Card, Grid, Typography } from '@mui/material'
import Login from './Login'
import Register from './Register'
import { useLocation } from 'react-router-dom'

const Authentication = () => {
  const location = useLocation()
  const backgroundImagePath = '/assets/sceen.jpg'
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={7}
        sx={{
          height: '100vh',
          backgroundImage: `url(${backgroundImagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Grid>
      <Grid item xs={5} container alignItems='center' justifyContent='center'>
        <Card sx={{ padding: 4, width: '80%' }}>
          <Typography variant='h1' align='center' gutterBottom>
            Your Hometown
          </Typography>
          {location.pathname === '/register' ? <Register /> : <Login />}
        </Card>
      </Grid>
    </Grid>
  )
}

export default Authentication
