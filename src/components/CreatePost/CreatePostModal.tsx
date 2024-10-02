import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import CameraRollIcon from '@mui/icons-material/CameraRoll'
import PhotoIcon from '@mui/icons-material/Photo'
import { useEffect, useState } from 'react'
import { getUserProfile } from '../../api/userApi'
import { uploadMedia } from '../../utils/uploadCloudnary'
import { Post, PostCreate } from '../../interface/PostInterface'
import { createPost } from '../../api/postApi'
import { UserProfile } from '../../interface/UserInterface'

interface CreatePostModalProps {
  open: boolean
  handleClose: () => void
  user: UserProfile
}

const initialPostCreate: PostCreate = {
  caption: '',
  image: '',
  video: '',
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  handleClose,
  user,
}) => {
  const [postContent, setPostContent] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [video, setVideo] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent(e.target.value)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const postInfo: PostCreate = {
      caption: postContent,
      image: image,
      video: video,
    }
    try {
      const response = await createPost(postInfo)
      if (response) {
        console.log('Post created successfully:', response)
        setPostContent('')
        setImage('')
        setVideo('')
      } else {
        console.log('Failed to create post:', response)
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setPostContent('')
      setImage('')
      setVideo('')
      setIsLoading(false)
      handleClose()
    }
  }

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsLoading(true)
      const uploadedVideoUrl = await uploadMedia(file, 'video')
      if (uploadedVideoUrl) {
        setVideo(uploadedVideoUrl)
      }
      setIsLoading(false)
    }
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Card
          sx={{
            padding: 3,
            width: 400,
            maxWidth: '100%',
            boxShadow: 24,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            <Avatar src={user.image} />
            <Typography variant='body1' marginLeft={1}>
              {'@' +
                user.firstName.toLocaleLowerCase() +
                '_' +
                user.lastName.toLocaleLowerCase()}
            </Typography>
          </Box>
          <TextField
            label="What's new?"
            multiline
            minRows={1}
            fullWidth
            value={postContent}
            onChange={handlePostChange}
            variant='outlined'
            margin='normal'
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                paddingBottom: '0',
                '& input': {
                  paddingBottom: '0',
                },
              },
            }}
          />
          <Box sx={{ paddingX: '12px', maxWidth: '100%' }}>
            {image && (
              <Box
                component='img'
                sx={{
                  boxShadow: 3,
                  maxWidth: '100%',
                }}
                alt='Sample Image'
                src={image}
              />
            )}
            {video && (
              <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                  component='video'
                  controls
                  src={video}
                  sx={{ height: 300, maxWidth: '100%' }}
                />
              </Card>
            )}
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-around', marginY: 2 }}
          >
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
            <input
              accept='video/*'
              type='file'
              id='video-input'
              style={{ display: 'none' }}
              onChange={handleVideoChange}
            />
            <label htmlFor='video-input'>
              <CameraRollIcon />
            </label>
          </Box>
          <Box mt={2} display='flex' justifyContent='flex-end'>
            <Button onClick={handleClose} sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              Post
            </Button>
            <Backdrop
              sx={(theme) => ({
                color: '#fff',
                zIndex: theme.zIndex.drawer + 1,
              })}
              open={isLoading}
              onClick={handleClose}
            >
              <CircularProgress color='inherit' />
            </Backdrop>
          </Box>
        </Card>
      </Box>
    </Modal>
  )
}

export default CreatePostModal
