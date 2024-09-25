import { Box, Tab, Tabs, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tabs } from './TabNavigation'
import UserPostCard from '../../components/Post/UserPostCard' 
import ProfileHeader from './ProfileHeader'
import UserReelsCard from '../../components/Reels/UserReelsCard'
import { getUserProfile } from '../../api/userApi'
import { UserProfile } from '../../interface/UserInterface'
import { Post } from '../../interface/PostInterface'
import { useParams } from 'react-router-dom'
import { getPostByUser } from '../../api/publicPostApi'
import { isYourProfile } from '../../utils/isYourProfile'
import { getUserById } from '../../api/publicUserApi'

const saved: number[] = [1, 2, 3, 4, 5]
const reels: number[] = [1, 2, 3, 4, 5, 6, 7]

const Profile = () => {
  const { id } = useParams<{ id: string }>()
  const [value, setValue] = React.useState('posts')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const [post, setPost] = React.useState<Post[]>([])
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const getUser = async () => {
    if (id) {
      const data = await getUserById(id)
      if (data) {
        setUser(data)
        const isOwner = await isYourProfile(id)
        setIsEditMode(isOwner)
      }
    } else {
      const token = localStorage.getItem('jwt')
      if (token) {
        const data = await getUserProfile()
        if (data) {
          setUser(data)
          setIsEditMode(true)
        }
      }
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      await getUser()
    }
    fetchUser()
  }, [id])

  useEffect(() => {
    if (user) {
      getPostByUser(user.id).then((data) => {
        if (data) {
          setPost(data)
        }
      })
    }
  }, [user])

  return (
    <Box width='80%'>
      {user != null && (
        <ProfileHeader
          user={user}
          postNumber={post.length}
          isEditMode={isEditMode}
        />
      )}
      <Box>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'lightgrey' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='primary'
            indicatorColor='primary'
            aria-label='profile tabs'
            centered
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.name} />
            ))}
          </Tabs>
        </Box>
        <Box mt={5}>
          <Grid container spacing={2} justifyContent='left'>
            {value === 'posts' &&
              post.map((item: Post, index: number) => (
                <Grid item xs={4} lg={4} key={index}>
                  <UserPostCard post={item} />
                </Grid>
              ))}
            {value === 'reels' &&
              reels.map((index: number) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <UserReelsCard src='https://videos.pexels.com/video-files/18069164/18069164-sd_360_640_24fps.mp4' />
                </Grid>
              ))}
            {value === 'saved' &&
              saved.map((index: number) => <div key={index}>Saved</div>)}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
