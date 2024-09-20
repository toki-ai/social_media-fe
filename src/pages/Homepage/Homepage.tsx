import { Grid } from '@mui/material'
import HomeRight from './components/HomeRight/HomeRight'
import MiddlePart from './components/MiddlePart/MiddlePart'

const Homepage = () => {
  return (
    <div className='w-full'>
      <Grid container>
        <Grid item lg={8} className='px-5 flex justify-center'>
          <MiddlePart />
        </Grid>
        <Grid item lg={4}>
          <HomeRight />
        </Grid>
      </Grid>
    </div>
  )
}

export default Homepage
