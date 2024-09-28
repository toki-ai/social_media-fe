import { Grid } from '@mui/material'
import UserList from './UserList'
import ChatWindow from './ChatWindow'
import { ChatProvider } from '../../context/chatContext'
import { Chat } from '../../interface/ChatInterface'
import { useState } from 'react'

const Message = () => {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  return (
    <ChatProvider>
      <Grid container>
        <Grid item container lg={4}>
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
