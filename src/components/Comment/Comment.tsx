import { Avatar, Box, Grid, TextField, Typography } from '@mui/material'

const Comment = () => {
  return (
    <Grid container>
      <Grid item lg={2}>
        <Avatar />
      </Grid>
      <Grid item lg={10}>
        <Typography variant='h6'>Username</Typography>
        <Typography
          variant='body2'
          sx={{
            whiteSpace: 'pre-line',
          }}
        >
          Chú Sơn và đội phù dâu phù rể tương lai Tôi yêu cái sự mềm xèo nàiiiii
          hsghhhah sghfhhhfhh🥺
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Comment
