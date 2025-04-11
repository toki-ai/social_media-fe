import {
  Box,
  Card,
  CircularProgress,
  Typography,
  TextField,
  Avatar,
  Button,
  List,
  ListItem,
  IconButton,
  Tabs,
  Tab,
  Grid,
  ImageList,
  ImageListItem,
} from '@mui/material'
import React, { useContext } from 'react'
import { UserProfile } from '../../interface/UserInterface'
import { Post } from '../../interface/PostInterface'
import { searchUser } from '../../api/publicApi/publicUserApi'
import { searchPost } from '../../api/publicApi/publicPostApi'
import TuneIcon from '@mui/icons-material/Tune'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import { UserContext, UserContextType } from '../../context/userContext'
import { followUser } from '../../api/userApi'
import UserPostCard from '../../components/Post/UserPostCard'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`search-tabpanel-${index}`}
      aria-labelledby={`search-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

const SearchPost = () => {
  const [searchValue, setSearchValue] = React.useState<string>('')
  const [notFound, setNotFound] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [users, setUsers] = React.useState<UserProfile[]>([])
  const [posts, setPosts] = React.useState<Post[]>([])
  const [tabValue, setTabValue] = React.useState(0)
  const navigate = useNavigate()
  const userContext = useContext(UserContext) as UserContextType

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    handleSearch(searchValue, newValue)
  }

  const handleSearch = async (query: string, tab: number) => {
    if (query === '') {
      setNotFound(false)
      setUsers([])
      setPosts([])
      return
    }

    setLoading(true)
    try {
      if (tab === 0) {
        // Posts tab
        const data = await searchPost(query)
        if (data) {
          if (data.length === 0) {
            setNotFound(true)
            setPosts([])
          } else {
            setNotFound(false)
            setPosts(data)
          }
        }
      } else {
        // Users tab
        const data = await searchUser(query)
        if (data) {
          if (data.length === 0) {
            setNotFound(true)
            setUsers([])
          } else {
            setNotFound(false)
            setUsers(data)
          }
        }
      }
    } catch (error) {
      console.error('API Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchValue(query)
    handleSearch(query, tabValue)
  }

  const handleFollowUser = (userId: string) => {
    if (userContext && userContext.user) {
      followUser(userId).then((data) => {
        if (data) {
          // Update users list to reflect new follow state
          setUsers(
            users.map((user) => {
              if (user.id === userId) {
                return {
                  ...user,
                  followers: user.followers
                    ? [...user.followers, userContext.user!.id]
                    : [userContext.user!.id],
                }
              }
              return user
            })
          )
        }
      })
    } else {
      navigate('/login')
    }
  }

  const handleViewProfile = (userId: string) => {
    navigate(`/profile/${userId}`)
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
      <Box sx={{ position: 'relative', mb: 3, mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 1,
            boxShadow: 1,
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <TextField
            placeholder='Search'
            variant='standard'
            value={searchValue}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              disableUnderline: true,
              endAdornment: loading && <CircularProgress size={20} />,
            }}
          />
          <IconButton></IconButton>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label='Posts' />
          <Tab label='Users' />
        </Tabs>
      </Box>

      {notFound && (
        <Box display='flex' justifyContent='center'>
          <Typography color='text.secondary'>No results found</Typography>
        </Box>
      )}

      <TabPanel value={tabValue} index={0}>
        {posts.length > 0 && (
          <ImageList cols={3} gap={16}>
            {posts.map((post, index) => (
              <ImageListItem
                key={index}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <img
                  src={post.image || ''}
                  alt={post.caption}
                  loading='lazy'
                  style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <List sx={{ width: '100%' }}>
          {users.map((user) => (
            <ListItem
              key={user.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                }}
                onClick={() => handleViewProfile(user.id)}
              >
                <Avatar
                  src={user.image}
                  sx={{ width: 50, height: 50, mr: 2 }}
                />
                <Box>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'medium' }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {user.followers?.length || 0} followers
                  </Typography>
                </Box>
              </Box>
              {userContext?.user?.id !== user.id && (
                <Button
                  variant='contained'
                  size='small'
                  sx={{
                    borderRadius: 5,
                    textTransform: 'none',
                    minWidth: 100,
                    bgcolor: user.followers?.includes(
                      userContext?.user?.id || ''
                    )
                      ? 'grey.300'
                      : 'primary.main',
                    color: user.followers?.includes(userContext?.user?.id || '')
                      ? 'text.primary'
                      : 'white',
                    '&:hover': {
                      bgcolor: user.followers?.includes(
                        userContext?.user?.id || ''
                      )
                        ? 'grey.400'
                        : 'primary.dark',
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFollowUser(user.id)
                  }}
                >
                  {user.followers?.includes(userContext?.user?.id || '')
                    ? 'Following'
                    : 'Follow'}
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </TabPanel>
    </Box>
  )
}

export default SearchPost
