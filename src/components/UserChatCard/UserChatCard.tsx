import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

interface UserChatCardProps {
  name: string
}

const UserChatCard: React.FC<UserChatCardProps> = ({ name }) => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#f5f5f5' },
      }}
    >
      <Avatar />
      <Typography variant='body1' sx={{ ml: 2 }}>
        {name}
      </Typography>
    </Box>
  )
}

export default UserChatCard
