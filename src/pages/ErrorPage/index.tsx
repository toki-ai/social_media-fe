import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import React from 'react'

const ErrorPage: React.FC = () => {
  const handleClick = () => {
    window.location.href = '/'
  }

  return (
    <Box
      sx={{
        display: 'flex',
        paddingTop: '50px',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom variant='h5' color='error'>
            Page not found
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={handleClick}>
            Back to homepage
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default ErrorPage
