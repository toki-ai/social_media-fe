import { Favorite, Send } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useTheme,
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
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { getChatDate } from '../../utils/formatDateTime'

const ChatWindow: React.FC<{ currentChat: Chat | null }> = ({
  currentChat,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [listMessages, setListMessages] = useState<Message[]>([])
  const [image, setImage] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)
  const theme = useTheme()

  useEffect(() => {
    if (currentChat != null)
      try {
        getMessageByChat(currentChat.id).then((data) => {
          if (data && Array.isArray(data)) {
            const sortedMessages = data.sort(
              (a: Message, b: Message) =>
                new Date(a.timeStamps).getTime() -
                new Date(b.timeStamps).getTime()
            )
            setListMessages(sortedMessages)
          }
        })
      } catch (e) {
        console.log(e)
      }
  }, [currentChat])

  const baseUrl = process.env.REACT_APP_BASE_API_URL

  useEffect(() => {
    const socket = new SockJS(`${baseUrl}/ws`)
    const client = Stomp.over(socket)
    client.connect(
      {},
      () => {
        setStompClient(client)
      },
      (error) => {
        console.error('Error connecting to WebSocket:', error)
      }
    )
  }, [])

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
        createMessage(messageCreate, currentChat.id, sendMessageToServer).then(
          (data) => {
            if (data) {
              const newMessage: Message = data
              setMessage('')
              setImage('')
            }
          }
        )
      }
    }
  }
  const sendMessageToServer = (newMessage: Message) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      )
    }
  }

  useEffect(() => {
    if (stompClient && currentChat && currentChat.users) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        (message) => {
          const newMessage = JSON.parse(message.body) as Message
          setListMessages((prevMessages) => [...prevMessages, newMessage])
        }
      )
      return () => subscription.unsubscribe()
    }
  }, [stompClient, currentChat])

  const isDifferentDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() !== date2.getFullYear() ||
      date1.getMonth() !== date2.getMonth() ||
      date1.getDate() !== date2.getDate()
    )
  }

  if (!currentChat)
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        sx={{ height: '100%' }}
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          sx={{
            border: `3px solid ${theme.palette.grey[300]}`,
            paddingY: 2,
            paddingX: 5,
            borderRadius: 2,
            marginBottom: 5,
          }}
        >
          <ChatBubbleIcon
            sx={{ fontSize: '7rem', color: theme.palette.grey[300] }}
          />
          <Typography>Starting a chat now</Typography>
        </Box>
      </Box>
    )

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
          }}
        >
          <Avatar src={resUser?.image} />
          <Typography variant='h6' sx={{ ml: 2 }}>
            {resUser != null
              ? resUser?.firstName + ' ' + resUser?.lastName
              : 'chat'}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
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
              listMessages.map((message, index) => {
                const previousMessage = listMessages[index - 1]
                const currentMessageDate = new Date(message.timeStamps)
                const previousMessageDate = previousMessage
                  ? new Date(previousMessage.timeStamps)
                  : null
                return (
                  <React.Fragment key={index}>
                    {previousMessageDate &&
                      isDifferentDay(
                        currentMessageDate,
                        previousMessageDate
                      ) && (
                        <Typography
                          variant='caption'
                          sx={{
                            width: '100%',
                            textAlign: 'center',
                            marginY: '10px',
                            display: 'block',
                            color: theme.palette.grey[600],
                          }}
                        >
                          {getChatDate(message.timeStamps)}
                        </Typography>
                      )}
                    <MessageItem
                      message={message}
                      isResMessage={resUser?.id === message.sender.id}
                    />
                  </React.Fragment>
                )
              })}
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box
            component='form'
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'end',
              border: `1px solid ${theme.palette.text.primary}`,
              borderRadius: '20px',
            }}
            onSubmit={handleSubmit}
          >
            <Box sx={{ ml: 1, flex: 1 }}>
              {image && (
                <Box
                  component='img'
                  sx={{
                    boxShadow: 3,
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                  alt='Sample Image'
                  src={image}
                />
              )}
              <InputBase
                sx={{ width: '100%', marginBottom: '5px' }}
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
                <PhotoIcon
                  sx={{
                    color: theme.palette.text.primary,
                    marginBottom: '3px',
                  }}
                />
              </label>
            </Box>
            <IconButton type='submit' sx={{ p: '10px' }}>
              <Send sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatWindow
