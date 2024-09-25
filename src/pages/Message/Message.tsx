import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@mui/material'
import MiniSideBar from '../../components/Sidebar/MiniSidebar'
import { Favorite, Send } from '@mui/icons-material'
import UserChatCard from '../../components/UserChatCard/UserChatCard'
import SearchUser from '../../components/Search/SearchUser'
import { searchUser } from '../../api/publicPostApi'
import { UserProfile } from '../../interface/UserInterface'
import React from 'react'

const Message = () => {
  const [searchResult, setSearchResult] = React.useState<UserProfile[] | null>(
    null
  )
  const handleUserSelect = (user: UserProfile) => {
    console.log(user)
  }
  return (
    <Grid container>
      <Grid item container lg={4}>
        <Grid item lg={2}>
          <MiniSideBar />
        </Grid>
        <Grid item lg={10}>
          {/* Sidebar */}
          <Box
            sx={{
              bgcolor: 'white',
              borderRight: '1px solid #ddd',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* User profile and status */}
            <Box sx={{ p: 2 }}>
              <Typography variant='h6' sx={{ ml: 2 }}>
                toki._.ai
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
              <SearchUser onUserSelect={handleUserSelect} />
              {/* {searchResult &&
                searchResult.map((item, index) => (
                  <UserChatCard key={index} name={item.firstName} />
                ))} */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid item lg={8}>
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f0f2f5' }}>
          {/* Chat Window */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
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
                Di
              </Typography>
            </Box>

            {/* Chat Messages */}
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
                {/* Message */}
                <Paper sx={{ p: 2, borderRadius: 2, mb: 1 }}>
                  <Typography variant='body2'>
                    Frog stickers for sale 🐸 Link in my profile.
                  </Typography>
                </Paper>
                {/* Image message */}
                <Paper sx={{ p: 1, borderRadius: 2, mb: 1, display: 'flex' }}>
                  <img
                    src='https://placekitten.com/100/100'
                    alt='cute cat'
                    style={{ borderRadius: '8px' }}
                  />
                  <IconButton>
                    <Favorite sx={{ color: 'red' }} />
                  </IconButton>
                </Paper>
              </Box>
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #ddd' }}>
              <Paper
                component='form'
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder='Type a message...'
                />
                <IconButton type='submit' sx={{ p: '10px' }}>
                  <Send />
                </IconButton>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Message
