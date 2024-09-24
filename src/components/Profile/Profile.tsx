import { Box, Tab, Tabs, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { tabs } from './TabNavigation'
import UserPostCard from '../Post/UserPostCard'
import ProfileHeader from './ProfileHeader'
import UserReelsCard from '../Reels/UserReelsCard'
import { getUserProfile } from '../../api/UserApi'

const post: number[] = [1, 2, 3, 4, 5]
const saved: number[] = [1, 2, 3, 4, 5]
const reels: number[] = [1, 2, 3, 4, 5, 6, 7]

const Profile = () => {
  const [value, setValue] = React.useState('reels')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    getUserProfile()
  },[])
  
  return (
    <Box py={10} width='80%'>
      <ProfileHeader />
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
              post.map((index: number) => (
                <Grid item xs={4} sm={3} md={2} key={index}>
                  <UserPostCard src='https://i.pinimg.com/564x/4f/18/4c/4f184c61cf9a471ac04080307e739ccd.jpg' />
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
