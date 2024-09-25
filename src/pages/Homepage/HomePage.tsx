import { Grid, Box } from '@mui/material'
import MiddlePart from '../../components/MiddlePart/MiddlePart'
import HomeRight from '../../components/HomeRight/HomeRight'

const Homepage: React.FC = () => {
  return (
    <Box width='100%'>
      <Grid container>
        <Grid item lg={8} sx={{ display: 'flex', justifyContent: 'center' }}>
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
