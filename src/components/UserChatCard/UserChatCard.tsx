import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { UserProfile } from '../../interface/UserInterface'
import { Chat } from '../../interface/ChatInterface'

const UserChatCard: React.FC<{
  user: UserProfile
  isCurrentChat: boolean
}> = ({ user, isCurrentChat }) => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#f5f5f5' },
        bgcolor: isCurrentChat ? 'gray' : 'white',
      }}
    >
      <Avatar />
      <Typography variant='body1' sx={{ ml: 2 }}>
        {user.firstName + ' ' + user.lastName}
      </Typography>
    </Box>
  )
}

export default UserChatCard
