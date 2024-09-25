import React, { useState } from 'react'
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
} from '@mui/material'
import { UserProfile, UserUpdate } from '../../interface/UserInterface'
import { updateUserProfile } from '../../api/userApi'

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
  const [gender, setGender] = useState(user.gender)

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
      gender: gender,
    }
    updateUserProfile(data)
    handleClose()
    window.location.reload()
  }

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

        <FormLabel component='legend'>Gender</FormLabel>
        <RadioGroup
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          sx={{ mb: 2 }}
        >
          <FormControlLabel value='male' control={<Radio />} label='Male' />
          <FormControlLabel value='female' control={<Radio />} label='Female' />
        </RadioGroup>

        <Box display='flex' justifyContent='flex-end'>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditProfileModal
