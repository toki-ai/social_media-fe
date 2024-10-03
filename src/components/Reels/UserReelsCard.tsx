import React from 'react'
import { Box, Card, CardMedia } from '@mui/material'

interface UserReelsCardProps {
  src: string
}

const UserReelsCard: React.FC<UserReelsCardProps> = ({ src }) => {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '2 / 3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Card sx={{ height: '100%', width: '100%' }}>
        <CardMedia
          component='video'
          controls
          src={src}
          sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      </Card>
    </Box>
  )
}

export default UserReelsCard
