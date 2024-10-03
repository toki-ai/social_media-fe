import React, { useState } from 'react'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  TextField,
  useTheme,
} from '@mui/material'
import QueueIcon from '@mui/icons-material/Queue'
import { uploadMedia } from '../../utils/uploadCloudnary'
import { createReels } from '../../api/reelsApi'
import { ReelsCreate } from '../../interface/ReelsInterface'
import { useNavigate } from 'react-router-dom'

const CreateReels = () => {
  const [video, setVideo] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [submissionError, setSubmissionError] = useState('')
  const maxLength = 100
  const theme = useTheme()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (newValue.length > maxLength) {
      setErrorMessage(`Vượt quá ${maxLength} ký tự!`)
    } else {
      setValue(newValue)
      setErrorMessage('')
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

  const navigate = useNavigate()

  const handleSubmit = () => {
    setSubmissionError('') // Reset the submission error message

    if (video.length === 0) {
      setSubmissionError('Please upload a video.')
      return
    }

    if (value.trim().length === 0) {
      setSubmissionError('Please enter a title.')
      return
    }

    const data: ReelsCreate = {
      title: value,
      videoUrl: video,
    }

    createReels(data).then((data) => {
      if (data) {
        navigate('/reels')
      }
    })
  }

  return (
    <Box
      sx={{
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          height: '550px',
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: '300px',
            border: `1px solid ${theme.palette.text.primary}`,
            borderRadius: '5px',
            height: '100%',
          }}
        >
          {video.length > 0 ? (
            <Card sx={{ height: '100%', width: '100%' }}>
              <CardMedia
                component='video'
                controls
                src={video}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </Card>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <QueueIcon
                sx={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ width: '300px' }}>
          <Box>
            <TextField
              label='Type Reels Description'
              value={value}
              onChange={handleChange}
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              error={!!errorMessage}
              helperText={errorMessage}
            />
            <input
              accept='video/*'
              type='file'
              id='video-input'
              style={{ display: 'none' }}
              onChange={handleVideoChange}
            />
            <label htmlFor='video-input'>
              <Box
                sx={{
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.text.primary}`,
                  padding: '5px 10px',
                  borderRadius: '20px',
                  margin: '5px',
                }}
              >
                Upload Video
              </Box>
            </label>
          </Box>
          <Box>
            {submissionError && (
              <Box sx={{ color: 'red', margin: '10px 0' }}>
                {submissionError}
              </Box>
            )}
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              Post
            </Button>
          </Box>
        </Box>
      </Box>
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  )
}

export default CreateReels
