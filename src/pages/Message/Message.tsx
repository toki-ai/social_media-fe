import { Grid, useTheme } from '@mui/material'
import UserList from './UserList'
import ChatWindow from './ChatWindow'
import { ChatProvider } from '../../context/chatContext'
import { Chat } from '../../interface/ChatInterface'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Message = () => {
  const location = useLocation()
  const [currentChat, setCurrentChat] = useState<Chat | null>(
    location.state?.currentChat || null
  )
  const theme = useTheme()

  return (
    <ChatProvider>
      <Grid container>
        <Grid
          item
          container
          lg={4}
          sx={{
            borderRight: `1px solid ${theme.palette.grey[400]}`,
          }}
        >
          <UserList setCurrentChat={setCurrentChat} currentChat={currentChat} />
        </Grid>
        <Grid item lg={8}>
          <ChatWindow currentChat={currentChat} />
        </Grid>
      </Grid>
    </ChatProvider>
  )
}

export default Message
