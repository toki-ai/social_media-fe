import { Avatar, Box, Card, IconButton, InputBase } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import VideocamIcon from '@mui/icons-material/Videocam'
import StoryCircle from './StoryCircle'
import { useEffect, useState } from 'react'
import { getUserProfile } from '../../api/UserApi'
import { UserProfile } from '../../interface/UserInterface'
import PostCard from '../Post/PostCard'
import CreatePostModal from '../CreatePost/CreatePostModal'

const story: number[] = [1, 2, 3, 4, 5, 6, 7]
const post: number[] = [1, 2, 3, 4, 5]

const MiddlePart = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  const handleOpenCreatePostModal = () => {
    setOpen(true)
  }

  const handleCloseCreatePostModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      getUserProfile().then((data) => {
        if (data) {
          setUser(data)
          console.log('User: ', data)
        }
      })
    }
  }, [])

  return (
    <Box sx={{ paddingX: 5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          borderRadius: 1,
        }}
      >
        <Avatar sx={{ width: '3rem', height: '3rem', marginRight: 1 }}>
          <AddIcon sx={{ fontSize: '2rem' }} />
        </Avatar>
        {story.map((index) => (
          <StoryCircle
            source='https://i.pinimg.com/564x/d3/87/36/d387361940647d0b35cb2ec8ac70a2aa.jpg'
            key={index}
          />
        ))}
      </Box>
      {user && (
        <Card sx={{ padding: 2, marginTop: 2, cursor: 'pointer' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ margin: '0 10px' }} />
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
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <AddPhotoAlternateIcon />
            </IconButton>
            <span>Media</span>
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>
            <span>Media</span>
          </Box>
        </Card>
      )}
      <Box
        sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {post.map((index) => (
          <PostCard key={index} />
        ))}
        <Box>
          <CreatePostModal
            open={open}
            handleClose={handleCloseCreatePostModal}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default MiddlePart
