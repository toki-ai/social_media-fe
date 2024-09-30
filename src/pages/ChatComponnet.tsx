import React, { useState, useEffect } from 'react'
import {
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

interface Message {
  nickname: string
  content: string
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws')
    const client = Stomp.over(socket)

    client.connect(
      {},
      () => {
        console.log('Connected to WebSocket')
        client.subscribe('/topic/messages', (msg) => {
          const receivedMessage: Message = JSON.parse(msg.body)
          setMessages((prevMessages) => [...prevMessages, receivedMessage])
        })

        setStompClient(client)
      },
      (error) => {
        console.error('Error connecting to WebSocket:', error)
      }
    )

    return () => {
      if (client && client.connected) {
        client.disconnect(() => {
          console.log('Disconnected from WebSocket')
        })
      }
    }
  }, [])

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const sendMessage = () => {
    if (message.trim() && stompClient && stompClient.connected) {
      const chatMessage: Message = {
        nickname,
        content: message,
      }

      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage))
      setMessage('')
    } else {
      console.warn(
        'Cannot send message, stompClient is not connected or message is empty'
      )
    }
  }

  return (
    <div>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{msg.nickname.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant='subtitle1'>{msg.nickname}</Typography>
              }
              secondary={msg.content}
            />
          </ListItem>
        ))}
      </List>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          placeholder='Enter your nickname'
          value={nickname}
          onChange={handleNicknameChange}
          autoFocus
        />
        <TextField
          placeholder='Type a message'
          value={message}
          onChange={handleMessageChange}
          fullWidth
        />
        <IconButton onClick={sendMessage} disabled={!message.trim()}>
          Send
        </IconButton>
      </div>
    </div>
  )
}

export default ChatComponent
