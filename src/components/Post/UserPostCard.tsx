import React from 'react'
import { Card, CardMedia } from '@mui/material'

interface UserPostCardProps {
  src: string
}

const UserPostCard: React.FC<UserPostCardProps> = ({ src }) => {
  return (
    <Card sx={{ width: '100%', aspectRatio: '1 / 1', cursor: 'pointer' }}>
      <CardMedia
        component='img'
        src={src}
        alt=''
        sx={{ objectFit: 'cover', height: '100%' }}
      />
    </Card>
  )
}

export default UserPostCard
