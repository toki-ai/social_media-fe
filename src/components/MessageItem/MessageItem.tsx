import {
  Avatar,
  Box,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import { Message } from '../../interface/ChatInterface'
import { getChatHour } from '../../utils/formatDateTime'

const MessageItem: React.FC<{ isResMessage: boolean; message: Message }> = ({
  isResMessage,
  message,
}) => {
  const theme = useTheme()
  return (
    <ListItem
      sx={{
        justifyContent: isResMessage ? 'flex-start' : 'flex-end',
      }}
    >
      {isResMessage && (
        <Avatar
          src={message.sender.image}
          sx={{ marginRight: '10px', height: '30px', width: '30px' }}
        />
      )}
      {!isResMessage && (
        <Typography
          sx={{ fontSize: '12px', color: theme.palette.grey[300], padding: 1 }}
        >
          {getChatHour(message.timeStamps)}
        </Typography>
      )}
      <Box
        sx={{
          maxWidth: '50vw',
          display: 'flex',
          alignItems: isResMessage ? 'flex-start' : 'flex-end',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        {message.image.length > 0 && (
          <Box
            component='img'
            sx={{
              boxShadow: 3,
              width: '200px',
              borderRadius: '10px',
            }}
            alt='Sample Image'
            src={message.image}
          />
        )}
        <Box
          id='hehehehe'
          sx={{
            backgroundColor: isResMessage
              ? theme.palette.grey[400]
              : theme.palette.primary.main,
            borderRadius: '20px',
            paddingX: '15px',
            paddingY: '5px',
            width: 'fit-content',
          }}
        >
          {message.content.length > 0 && (
            <Typography
              id='check'
              sx={{
                color: isResMessage ? theme.palette.text.primary : '#fffcfc',
                wordWrap: 'break-word',
              }}
            >
              {message.content}
            </Typography>
          )}
        </Box>
      </Box>
      {isResMessage && (
        <Typography
          sx={{
            fontSize: '12px',
            color: theme.palette.grey[300],
            padding: 1,
          }}
        >
          {getChatHour(message.timeStamps)}
        </Typography>
      )}
    </ListItem>
  )
}

export default MessageItem
