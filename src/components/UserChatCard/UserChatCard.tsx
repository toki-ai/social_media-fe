import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { UserProfile } from '../../interface/UserInterface'
import { Chat } from '../../interface/ChatInterface'
import { useTheme } from '@mui/material/styles'

const UserChatCard: React.FC<{
  user: UserProfile
  isCurrentChat: boolean
}> = ({ user, isCurrentChat }) => {
  const theme = useTheme()
  
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': { backgroundColor: theme.palette.action.hover },
        bgcolor: isCurrentChat ? 'gray' : '',
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
