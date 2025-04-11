import { Box, Tab, Tabs, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tabs } from './TabNavigation'
import UserPostCard from '../../components/Post/UserPostCard'
import ProfileHeader from './ProfileHeader'
import UserReelsCard from '../../components/Reels/UserReelsCard'
import { getUserProfile } from '../../api/userApi'
import { UserProfile } from '../../interface/UserInterface'
import { Post } from '../../interface/PostInterface'
import { useParams } from 'react-router-dom'
import { getPostById, getPostByUser } from '../../api/publicApi/publicPostApi'
import { isYourProfile } from '../../utils/isYourProfile'
import { getUserById } from '../../api/publicApi/publicUserApi'
import { getReelsByUser } from '../../api/publicApi/publicReelsApi'
import { Reels } from '../../interface/ReelsInterface'
import CircularProgress from '@mui/material/CircularProgress'

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [post, setPost] = useState<Post[]>([])
  const [reels, setReels] = useState<Reels[]>([])
  const [value, setValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const { userId } = useParams()
  const isEditMode = isYourProfile(userId || null)
  const [savePost, setSavePosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (!userId) {
        // If no userId in params, try to get current user profile
        try {
          const currentUser = await getUserProfile()
          if (currentUser) {
            setUser(currentUser)
            console.log('Fetched current user:', currentUser)

            const postData = await getPostByUser(currentUser.id)
            if (postData) {
              setPost(postData)
              console.log('Fetched posts:', postData)
            }

            const reelsData = await getReelsByUser(currentUser.id)
            if (reelsData) {
              setReels(reelsData)
              console.log('Fetched reels:', reelsData)
            }
          }
        } catch (error) {
          console.error('Error fetching current user data:', error)
        }
      } else {
        try {
          const userData = await getUserById(userId)
          if (userData) {
            setUser(userData)
            console.log('Fetched user by ID:', userData)

            const postData = await getPostByUser(userId)
            if (postData) {
              setPost(postData)
              console.log('Fetched posts:', postData)
            }

            const reelsData = await getReelsByUser(userId)
            if (reelsData) {
              setReels(reelsData)
              console.log('Fetched reels:', reelsData)
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
      setLoading(false)
    }

    fetchData()
  }, [userId])

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (user?.saved && user.saved.length > 0) {
        try {
          const fetchedPosts = await Promise.all(
            user.saved.map((postId: string) => getPostById(postId))
          )
          const validPosts = fetchedPosts.filter(
            (post): post is Post => post !== null
          )
          setSavePosts(validPosts)
          console.log('Fetched saved posts:', validPosts)
        } catch (error) {
          console.error('Error fetching saved posts:', error)
        }
      }
    }

    fetchSavedPosts()
  }, [user?.saved])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography>No user data found</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <ProfileHeader user={user} postCount={post.length} />
      </Box>

      <Box sx={{ width: '70%', maxWidth: '1200px' }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='fullWidth'
            sx={{ mb: 2 }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {index === 0 && (
                      <Typography variant='body2'>{tab.name}</Typography>
                    )}
                    {index !== 0 && tab.name}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {value === 0 && (
            <Grid container spacing={2}>
              {post.map((p) => (
                <Grid item xs={12} sm={6} md={4} key={p.id}>
                  <UserPostCard post={p} />
                </Grid>
              ))}
            </Grid>
          )}

          {value === 1 && (
            <Grid container spacing={2}>
              {reels.map((r) => (
                <Grid item xs={12} sm={6} md={4} key={r.id}>
                  <UserReelsCard src={r.videoUrl} />
                </Grid>
              ))}
            </Grid>
          )}

          {value === 2 && (
            <Grid container spacing={2}>
              {savePost.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.id || index}>
                  <UserPostCard post={item} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
