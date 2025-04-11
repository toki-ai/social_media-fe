import {
  Avatar,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from '@mui/material'
import { UserProfile } from '../../interface/UserInterface'
import { useContext, useEffect, useState } from 'react'
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal'
import { useNavigate } from 'react-router-dom'
import { getChatByTwoUser } from '../../api/chatApi'
import { followUser } from '../../api/userApi'
import {
  getFollowersByUserId,
  getFollowingByUserId,
} from '../../api/publicApi/publicUserApi'
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone'
import CloseIcon from '@mui/icons-material/Close'
import { UserContext, UserContextType } from '../../context/userContext'

interface FollowDialogProps {
  open: boolean
  onClose: () => void
  title: string
  users: UserProfile[]
  onUserClick: (userId: string) => void
}

const FollowDialog: React.FC<FollowDialogProps> = ({
  open,
  onClose,
  title,
  users,
  onUserClick,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {title}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            onClick={() => onUserClick(user.id)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemAvatar>
              <Avatar src={user.image} />
            </ListItemAvatar>
            <ListItemText
              primary={`${user.firstName} ${user.lastName}`}
              secondary={`@${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}`}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

const ProfileHeader: React.FC<{ user: UserProfile; postCount?: number }> = ({
  user,
  postCount = 0,
}) => {
  const [followers, setFollowers] = useState<UserProfile[]>([])
  const [following, setFollowing] = useState<UserProfile[]>([])
  const [followersDialogOpen, setFollowersDialogOpen] = useState(false)
  const [followingDialogOpen, setFollowingDialogOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [openEditProfile, setOpenEditProfile] = useState(false)
  const { user: currentUser } = useContext(UserContext) as UserContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (user.id) {
      getFollowersByUserId(user.id).then((data) => {
        if (data) setFollowers(data)
      })
      getFollowingByUserId(user.id).then((data) => {
        if (data) setFollowing(data)
      })
      if (currentUser) {
        setIsFollowing(currentUser.following.includes(user.id))
      }
    }
  }, [user.id, currentUser])

  const handleFollow = async () => {
    if (currentUser) {
      const updatedUser = await followUser(user.id)
      if (updatedUser) {
        setIsFollowing(!isFollowing)
      }
    }
  }

  const handleChat = async () => {
    if (currentUser) {
      const chat = await getChatByTwoUser(currentUser.id)
      if (chat) {
        navigate(`/chat/${chat.id}`)
      }
    }
  }

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`)
    setFollowersDialogOpen(false)
    setFollowingDialogOpen(false)
  }

  const isYourProfile = currentUser?.id === user.id

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
          {isYourProfile ? (
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
                onClick={() => setOpenEditProfile(true)}
              >
                Edit profile
              </Button>
              <EditProfileModal
                open={openEditProfile}
                handleClose={() => setOpenEditProfile(false)}
                user={user}
              />
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
                {isFollowing ? 'Following' : 'Follow'}
                {isFollowing && <FileDownloadDoneIcon />}
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
          <Typography variant='body2'>{postCount} posts</Typography>
          <Typography
            variant='body2'
            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
            onClick={() => setFollowersDialogOpen(true)}
          >
            {user?.followers.length} followers
          </Typography>
          <Typography
            variant='body2'
            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
            onClick={() => setFollowingDialogOpen(true)}
          >
            {user?.following.length} following
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography variant='body1'>
            {user?.firstName} {user?.lastName}
          </Typography>
          {user.bio && (
            <Typography variant='body2' color='text.secondary'>
              {user.bio}
            </Typography>
          )}
        </Box>
      </Box>

      <FollowDialog
        open={followersDialogOpen}
        onClose={() => setFollowersDialogOpen(false)}
        title='Followers'
        users={followers}
        onUserClick={handleUserClick}
      />

      <FollowDialog
        open={followingDialogOpen}
        onClose={() => setFollowingDialogOpen(false)}
        title='Following'
        users={following}
        onUserClick={handleUserClick}
      />
    </Box>
  )
}

export default ProfileHeader
