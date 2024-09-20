import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import { tabs } from './TabNavigation'
import UserPostCard from '../Post/UserPostCard'
import ProfileHeader from './ProfileHeader'
import UserReelsCard from '../Reels/UserReelsCard'
const post: number[] = [1, 2, 3, 4, 5]
const saved: number[] = [1, 2, 3, 4, 5]
const reels: number[] = [1, 2, 3, 4, 5, 6, 7]
const Profile = () => {
  const [value, setValue] = React.useState('reels')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <div className='py-10 w-[80%]'>
      <ProfileHeader />
      <section>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'lightgrey' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='primary'
            indicatorColor='primary'
            aria-label='secondary tabs example'
            centered
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.name} />
            ))}
          </Tabs>
        </Box>
        <div className='flex justify-center mt-5'>
          {value === 'posts' ? (
            <div className='grid grid-cols-3 gap-1'>
              {post.map((index: number) => (
                <UserPostCard
                  key={index}
                  src='https://i.pinimg.com/564x/4f/18/4c/4f184c61cf9a471ac04080307e739ccd.jpg'
                />
              ))}
            </div>
          ) : value === 'reels' ? (
            <div className='grid grid-cols-4 gap-1'>
              {reels.map((index: number) => (
                <UserReelsCard
                  key={index}
                  src='https://videos.pexels.com/video-files/18069164/18069164-sd_360_640_24fps.mp4'
                />
              ))}
            </div>
          ) : value === 'saved' ? (
            <div className='grid grid-cols-3 gap-1'>
              {saved.map((index: number) => (
                <UserPostCard
                  key={index}
                  src='https://i.pinimg.com/564x/ed/8b/24/ed8b24b4312535d94dcc2adc560d2a8d.jpg'
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

export default Profile
