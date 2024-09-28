import { Avatar, Box, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { Message } from '../../interface/ChatInterface'

const MessageItem: React.FC<{ isResMessage: boolean; message: Message }> = ({
  isResMessage,
  message,
}) => {
  return (
    <ListItem
      sx={{
        justifyContent: isResMessage ? 'flex-start' : 'flex-end',
      }}
    >
      {isResMessage && <Avatar />}
      <ListItemText
        sx={{
          backgroundColor: isResMessage ? '#0084ff' : '#e5e5ea',
          borderRadius: '10px',
          padding: '10px',
          maxWidth: '70%',
        }}
        primary={
          <Box>
            {message.image.length > 0 && (
              <Box
                component='img'
                sx={{
                  boxShadow: 3,
                  width: '200px',
                }}
                alt='Sample Image'
                src={message.image}
              />
            )}
            {message.content.length > 0 && (
              <Typography
                sx={{
                  color: isResMessage ? '#fff' : '#000',
                  wordWrap: 'break-word',
                }}
              >
                {message.content}
              </Typography>
            )}
          </Box>
        }
      />
      {!isResMessage && <Avatar />}
    </ListItem>
  )
}

export default MessageItem
