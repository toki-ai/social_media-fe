import { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Backdrop,
  CircularProgress,
  Avatar,
  useTheme,
} from '@mui/material'
import { UserProfile, UserUpdate } from '../../interface/UserInterface'
import { updateUserProfile } from '../../api/userApi'
import { uploadMedia } from '../../utils/uploadCloudnary'
import PhotoIcon from '@mui/icons-material/Photo'

const EditProfileModal = ({
  open,
  handleClose,
  user,
}: {
  open: boolean
  handleClose: () => void
  user: UserProfile
}) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [image, setImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('hi')
    const file = e.target.files?.[0]
    if (file) {
      console.log('hi')
      setIsLoading(true)
      const uploadedImageUrl = await uploadMedia(file, 'image')
      if (uploadedImageUrl) {
        setImage(uploadedImageUrl)
        console.log('Image uploaded:', uploadedImageUrl)
      }
      setIsLoading(false)
    }
  }

  const handleSubmit = () => {
    if (firstName === '') {
      setFirstName(user.firstName)
    }
    if (lastName === '') {
      setLastName(user.lastName)
    }
    const data: UserUpdate = {
      firstName: firstName,
      lastName: lastName,
      image: image,
    }
    updateUserProfile(data)
    handleClose()
    window.location.reload()
  }

  const theme = useTheme()

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant='h6' mb={2}>
          Edit Profile
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Avatar
            sx={{
              boxShadow: 3,
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
            src={image ? image : user.image}
          ></Avatar>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingY: '10px',
            }}
          >
            <input
              accept='image/*'
              type='file'
              id='image-input'
              style={{
                display: 'none',
              }}
              onChange={(e) => {
                handleImageChange(e)
              }}
            />
            <label htmlFor='image-input'>
              <Box
                sx={{
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                  padding: '5px 10px',
                  borderRadius: '20px',
                  margin: '5px',
                }}
              >
                Change Avatar
              </Box>
            </label>
          </Box>
        </Box>

        <TextField
          label='First Name'
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label='Last Name'
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box display='flex' justifyContent='flex-end'>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSubmit}>
            Save
          </Button>
        </Box>
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
    </Modal>
  )
}

export default EditProfileModal
