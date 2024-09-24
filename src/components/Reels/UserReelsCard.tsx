import React from 'react'
import { Box } from '@mui/material'

interface UserReelsCardProps {
  src: string
}

const UserReelsCard: React.FC<UserReelsCardProps> = ({ src }) => {
  return (
    <Box className='w-full aspect-[2/3]' display='flex'>
      <video controls className='w-full h-full object-cover'>
        <source src={src} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </Box>
  )
}

export default UserReelsCard
