import { Avatar, Button, Box, Typography } from '@mui/material'
import { UserProfile } from '../../interface/UserInterface'
import { useState } from 'react'
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal'

const ProfileHeader: React.FC<{
  user: UserProfile
  postNumber: number
  isEditMode: boolean
}> = ({ user, postNumber, isEditMode }) => {
  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }
  return (
    <Box display='flex' width='100%' mt={5}>
      <Box
        width='30%'
        display='flex'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Avatar
          sx={{ width: '10rem', height: '10rem' }}
          src={user.image ? user.image : ''}
        />
      </Box>
      <Box width='70%' pl={2}>
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' component='span'>
            @{user?.firstName.toLowerCase()}_{user?.lastName.toLowerCase()}
          </Typography>
          {isEditMode ? (
            <Box ml={2}>
              <Button
                variant='contained'
                size='small'
                sx={{
                  backgroundColor: 'lightgrey',
                  color: 'black',
                  boxShadow: 'none',
                  textTransform: 'none',
                  marginLeft: '10px',
                }}
                onClick={handleOpenModal}
              >
                Edit profile
              </Button>
              <EditProfileModal
                open={open}
                handleClose={handleCloseModal}
                user={user}
              />
              <Button
                variant='contained'
                size='small'
                sx={{
                  backgroundColor: 'lightgrey',
                  color: 'black',
                  boxShadow: 'none',
                  textTransform: 'none',
                  marginLeft: '10px',
                }}
              >
                View archive
              </Button>
            </Box>
          ) : (
            <Box ml={2}>
              <Button
                variant='contained'
                size='small'
                sx={{
                  backgroundColor: 'lightgrey',
                  color: 'black',
                  boxShadow: 'none',
                  textTransform: 'none',
                  marginLeft: '10px',
                }}
              >
                Following
              </Button>
              <Button
                variant='contained'
                size='small'
                sx={{
                  backgroundColor: 'lightgrey',
                  color: 'black',
                  boxShadow: 'none',
                  textTransform: 'none',
                  marginLeft: '10px',
                }}
              >
                Message
              </Button>
            </Box>
          )}
        </Box>
        <Box display='flex' justifyContent='space-between' width='50%' mt={1}>
          <Typography variant='body2'>{postNumber} posts</Typography>
          <Typography variant='body2'>
            {user.followers.length} followers
          </Typography>
          <Typography variant='body2'>
            {user.following.length} following
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography variant='body1'>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant='body2'>
            Don't let fear stop you from playing the game♟️✨
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileHeader
