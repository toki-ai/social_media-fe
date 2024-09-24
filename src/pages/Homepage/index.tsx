import { Grid, Box } from '@mui/material'
import HomeRight from './components/HomeRight/HomeRight'
import MiddlePart from './components/MiddlePart/MiddlePart'

const Homepage: React.FC = () => {
  return (
    <Box width='100%'>
      <Grid container>
        <Grid
          item
          lg={8}
          sx={{ px: 5, display: 'flex', justifyContent: 'center' }}
        >
          <MiddlePart />
        </Grid>
        <Grid item lg={4}>
          <HomeRight />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Homepage