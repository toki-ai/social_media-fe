import { Avatar, Button, Box, Typography } from '@mui/material'
import { UserProfile } from '../../interface/UserInterface'
import { useContext, useEffect, useState } from 'react'
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal'
import { useNavigate } from 'react-router-dom'
import { getChatByTwoUser } from '../../api/chatApi'
import { followUser } from '../../api/userApi'
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone'
import { UserContext, UserContextType } from '../../context/userContext'

const ProfileHeader: React.FC<{
  user: UserProfile
  postNumber: number
  isEditMode: boolean
}> = ({ user, postNumber, isEditMode }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const userContext = useContext(UserContext) as UserContextType

  const [isUserFollowing, setIsUserFollowing] = useState<boolean>(false)

  useEffect(() => {
    if (userContext.user) {
      const check = user.followers.includes(userContext.user.id)
      setIsUserFollowing(check)
    }
  }, [])

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleChat = () => {
    getChatByTwoUser(user.id).then((data) => {
      if (data) {
        navigate('/messages', { state: { currentChat: data } })
      }
    })
  }

  const handleFollow = () => {
    if (userContext.user) {
      followUser(user.id).then((data) => {
        if (data) {
          window.location.reload()
        }
      })
    } else {
      navigate('/login')
    }
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
            @{user?.firstName.toLocaleLowerCase()}_
            {user?.lastName.toLocaleLowerCase()}
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
                onClick={handleFollow}
              >
                Following
                {isUserFollowing ? <FileDownloadDoneIcon /> : ''}
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
                onClick={handleChat}
              >
                Message
              </Button>
            </Box>
          )}
        </Box>
        <Box display='flex' justifyContent='space-between' width='50%' mt={1}>
          <Typography variant='body2'>{postNumber} posts</Typography>
          <Typography variant='body2'>
            {user?.followers.length} followers
          </Typography>
          <Typography variant='body2'>
            {user?.following.length} following
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
