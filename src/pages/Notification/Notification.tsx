import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

interface NotificationItem {
  id: string
  username: string
  avatar: string
  content: string
  time: string
  isRead: boolean
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    username: 'xuanmai.__',
    avatar:
      'https://i.pinimg.com/736x/02/56/11/02561183bde1e10a10bb2501df18e799.jpg',
    content: 'Bàn trường ca Hoá Bình vn',
    time: '1 ngày',
    isRead: false,
  },
  {
    id: '2',
    username: 'cendzy__',
    avatar:
      'https://i.pinimg.com/736x/02/56/11/02561183bde1e10a10bb2501df18e799.jpg',
    content:
      'Xin lỗi vì đã để đứa trẻ ưu tú năm ấy đã đi lạc quá lâu. Yên tâm vì tôi đã trở lại đường đua.',
    time: '2 ngày',
    isRead: false,
  },
  {
    id: '3',
    username: 'nbq.huy',
    avatar:
      'https://i.pinimg.com/736x/02/56/11/02561183bde1e10a10bb2501df18e799.jpg',
    content: 'Followed you',
    time: '4 ngày',
    isRead: true,
  },
  {
    id: '4',
    username: 'System',
    avatar: '',
    content: 'Your reply got over 100 views.',
    time: '1 tuần',
    isRead: true,
  },
  {
    id: '5',
    username: 'englishfuns',
    avatar:
      'https://i.pinimg.com/736x/02/56/11/02561183bde1e10a10bb2501df18e799.jpg',
    content: 'Posted their first thread',
    time: '2 tuần',
    isRead: true,
  },
  {
    id: '66',
    username: 'nbq.huy',
    avatar:
      'https://i.pinimg.com/736x/02/56/11/02561183bde1e10a10bb2501df18e799.jpg',
    content: 'Followed you',
    time: '4 ngày',
    isRead: true,
  },
  {
    id: '77',
    username: 'System',
    avatar: '',
    content: 'Your reply got over 100 views.',
    time: '1 tuần',
    isRead: true,
  },
  {
    id: '8',
    username: 'englishfuns',
    avatar:
      'https://i.pinimg.com/736x/02/56/11/02561183bde1e10a10bb2501df18e799.jpg',
    content: 'Posted their first thread',
    time: '2 tuần',
    isRead: true,
  },
  {
    id: '9',
    username: 'nbq.huy',
    avatar:
      'https://i.pinimg.com/736x/02/56/11/02561183bde1e10a10bb2501df18e799.jpg',
    content: 'Followed you',
    time: '4 ngày',
    isRead: true,
  },
  {
    id: '10',
    username: 'System',
    avatar: '',
    content: 'Your reply got over 100 views.',
    time: '1 tuần',
    isRead: true,
  },
  {
    id: '11',
    username: 'englishfuns',
    avatar:
      'https://i.pinimg.com/736x/02/56/11/02561183bde1e10a10bb2501df18e799.jpg',
    content: 'Posted their first thread',
    time: '2 tuần',
    isRead: true,
  },
]

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  useEffect(() => {
    alert('Coming soon! 🚀')
  }, [])

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', pt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          mb: 2,
        }}
      >
        <Typography variant='h6'>Activity</Typography>
        <IconButton onClick={handleMenuClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Mark all as read</MenuItem>
        </Menu>
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {mockNotifications.map((notification, index) => (
          <Box key={notification.id}>
            <ListItem
              alignItems='flex-start'
              sx={{
                bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={notification.avatar}
                  sx={{ width: 44, height: 44 }}
                >
                  {!notification.avatar && notification.username.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    component='span'
                    variant='body1'
                    color='text.primary'
                    sx={{
                      display: 'inline',
                      fontWeight: notification.isRead ? 'normal' : 'bold',
                    }}
                  >
                    {notification.username}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {notification.content}
                    </Typography>
                    <Typography
                      component='span'
                      variant='body2'
                      color='text.secondary'
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      {notification.time}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < mockNotifications.length - 1 && (
              <Divider variant='inset' component='li' />
            )}
          </Box>
        ))}
      </List>
    </Box>
  )
}

export default Notification
