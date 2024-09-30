import { Send } from '@mui/icons-material'
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Chat, Message, MessageCreate } from '../../interface/ChatInterface'
import { UserProfile } from '../../interface/UserInterface'
import { UserContext, UserContextType } from '../../context/userContext'
import { getResUser } from '../../utils/getResUser'
import { uploadMedia } from '../../utils/uploadCloudnary'
import PhotoIcon from '@mui/icons-material/Photo'
import { createMessage, getMessageByChat } from '../../api/messageApi'
import MessageItem from '../../components/MessageItem/MessageItem'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

const ChatWindow: React.FC<{ currentChat: Chat | null }> = ({
  currentChat,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [listMessages, setListMessages] = useState<Message[]>([])
  const [image, setImage] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  //const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)

  useEffect(() => {
    if (currentChat != null)
      try {
        getMessageByChat(currentChat.id).then((data) => {
          if (data && Array.isArray(data)) setListMessages(data)
        })
      } catch (e) {
        console.log(e)
      }
  }, [currentChat])

  const { user }: { user: UserProfile | null } = useContext(
    UserContext
  ) as UserContextType

  let resUser: UserProfile | null = null
  if (currentChat != null && user != null) {
    resUser = getResUser(currentChat?.users, user)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsLoading(true)
      const uploadedImageUrl = await uploadMedia(file, 'image')
      if (uploadedImageUrl) {
        setImage(uploadedImageUrl)
        console.log('Image uploaded:', uploadedImageUrl)
      }
      setIsLoading(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (message.trim()) {
      const messageCreate: MessageCreate = {
        content: message,
        image: image,
      }
      if (currentChat != null) {
        createMessage(messageCreate, currentChat.id).then((data) => {
          if (data) {
            const newMessage: Message = data
            setListMessages((prevMessages) => [...prevMessages, newMessage])
          }
        })
      }
      setMessage('')
      setImage('')
    }
  }

  // useEffect(() => {
  //   const socket = new SockJS('http://localhost:8080/ws')
  //   const client = Stomp.over(socket)
  //   client.connect(
  //     {},
  //     () => {
  //       console.log('Connected to WebSocket')
  //       setStompClient(client)
  //     },
  //     (error) => {
  //       console.error('Error connecting to WebSocket:', error)
  //     }
  //   )
  // }, [])

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f0f2f5' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'white',
            borderBottom: '1px solid #ddd',
          }}
        >
          <Avatar />
          <Typography variant='h6' sx={{ ml: 2 }}>
            {resUser != null
              ? resUser?.firstName + ' ' + resUser?.lastName
              : 'chat'}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: 'auto',
            bgcolor: '#e5ddd5',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {listMessages.length > 0 &&
              listMessages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isResMessage={resUser?.id === message.sender.id}
                />
              ))}
          </Box>
        </Box>
        <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #ddd' }}>
          <Paper
            component='form'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            onSubmit={handleSubmit}
          >
            <Box sx={{ ml: 1, flex: 1 }}>
              {image && (
                <Box
                  component='img'
                  sx={{
                    boxShadow: 3,
                    width: '200px',
                  }}
                  alt='Sample Image'
                  src={image}
                />
              )}
              <InputBase
                sx={{ width: '100%' }}
                placeholder='Type a message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Box>
            <Box>
              <input
                accept='image/*'
                type='file'
                id='image-input'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor='image-input'>
                <PhotoIcon />
              </label>
            </Box>
            <IconButton type='submit' sx={{ p: '10px' }}>
              <Send />
            </IconButton>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatWindow
