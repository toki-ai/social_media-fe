import { Box, Tab, Tabs, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tabs } from './TabNavigation'
import UserPostCard from '../Post/UserPostCard'
import ProfileHeader from './ProfileHeader'
import UserReelsCard from '../Reels/UserReelsCard'
import { getUserProfile } from '../../api/userApi'
import { UserProfile } from '../../interface/UserInterface'
import { getPostByUser } from '../../api/postApi'
import { Post } from '../../interface/PostInterface'

//const post: number[] = [1, 2, 3, 4, 5]
const saved: number[] = [1, 2, 3, 4, 5]
const reels: number[] = [1, 2, 3, 4, 5, 6, 7]

const Profile = () => {
  const [value, setValue] = React.useState('reels')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const [post, setPost] = React.useState<Post[]>([])

  useEffect(() => {
    if (value === 'reels') {
      console.log('Reels')
    } else if (value === 'posts') {
      getPostByUser().then((data) => {
        if (data) {
          setPost(data)
        }
      })
    } else if (value === 'saved') {
    }
  }, [value])

  const [user, setUser] = useState<UserProfile | null>(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      getUserProfile().then((data) => {
        if (data) {
          setUser(data)
        }
      })
    }
  }, [])

  return (
    <Box py={10} width='80%'>
      {user != null && <ProfileHeader user={user} />}
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
          <Grid container spacing={2} justifyContent='center'>
            {value === 'posts' &&
              post.map((value: Post, index: number) => (
                <Grid item xs={4} sm={3} md={2} key={index}>
                  <UserPostCard src={value.image} />
                </Grid>
              ))}
            {value === 'reels' &&
              reels.map((index: number) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <UserReelsCard src='https://videos.pexels.com/video-files/18069164/18069164-sd_360_640_24fps.mp4' />
                </Grid>
              ))}
            {value === 'saved' &&
              saved.map((index: number) => (
                <Grid item xs={4} sm={3} md={2} key={index}>
                  <UserPostCard src='https://i.pinimg.com/564x/ed/8b/24/ed8b24b4312535d94dcc2adc560d2a8d.jpg' />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
