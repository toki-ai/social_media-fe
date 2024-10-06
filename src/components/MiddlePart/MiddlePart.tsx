import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  InputBase,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import VideocamIcon from '@mui/icons-material/Videocam'
import StoryCircle from './StoryCircle'
import { useContext, useEffect, useState } from 'react'
import PostCard from '../Post/PostCard'
import CreatePostModal from '../CreatePost/CreatePostModal'
import { Post } from '../../interface/PostInterface'
import { getAllPost } from '../../api/publicApi/publicPostApi'
import { UserContext, UserContextType } from '../../context/userContext'
import { UserProfile } from '../../interface/UserInterface'
import { getAllUser } from '../../api/publicApi/publicUserApi'

const MiddlePart = () => {
  const [listPost, setListPost] = useState<Post[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [listUser, setListUser] = useState<UserProfile[]>([])

  const handleOpenCreatePostModal = () => {
    setOpen(true)
  }

  const handleCloseCreatePostModal = () => {
    setOpen(false)
  }

  const { user }: UserContextType = useContext(UserContext) as UserContextType

  useEffect(() => {
    getAllPost().then((data) => {
      if (data) {
        setListPost(data)
      } else {
        console.log('Failed to get post')
      }
    })
    getAllUser().then((data) => {
      if (data) {
        setListUser(data)
      }
    })
  }, [])

  return (
    <Box sx={{ paddingX: 5, width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'start' }}>
        <Avatar
          sx={{ width: '3rem', height: '3rem', marginLeft: 1, marginRight: 1 }}
        >
          <AddIcon sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {listUser.map((user, index) => (
            <Box sx={{ marginX: '10px' }} key={index}>
              <StoryCircle user={user} />
            </Box>
          ))}
        </Box>
      </Box>
      {user != null && (
        <Box>
          <Divider sx={{ marginTop: 2 }} />
          <Box sx={{ paddingTop: 3, cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ margin: '0 10px' }} src={user.image} />
              <InputBase
                readOnly
                placeholder='What do you want to share?'
                sx={{
                  paddingLeft: 1,
                  borderRadius: '20px',
                  backgroundColor: 'transparent',
                  width: '90%',
                  border: '1px solid lightgray',
                  height: '40px',
                }}
                onClick={handleOpenCreatePostModal}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: 4,
                marginY: 1,
              }}
            >
              <Box
                onClick={handleOpenCreatePostModal}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton color='primary'>
                  <AddPhotoAlternateIcon />
                </IconButton>
                <span>Media</span>
              </Box>
              <Box
                onClick={handleOpenCreatePostModal}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton color='primary'>
                  <VideocamIcon />
                </IconButton>
                <span>Media</span>
              </Box>
            </Box>
          </Box>
          <Divider />
        </Box>
      )}
      <Box
        sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {listPost.map((item: Post, index: number) => (
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
            key={index}
          >
            <Box sx={{ width: '80%' }}>
              <PostCard post={item} user={user} />
            </Box>
          </Box>
        ))}
        {user != null && (
          <Box>
            <CreatePostModal
              open={open}
              handleClose={handleCloseCreatePostModal}
              user={user}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MiddlePart
