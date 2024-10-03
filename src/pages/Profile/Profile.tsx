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
import { getPostById, getPostByUser } from '../../api/publicApi/publicPostApi'
import { isYourProfile } from '../../utils/isYourProfile'
import { getUserById } from '../../api/publicApi/publicUserApi'
import { getReelsByUser } from '../../api/publicApi/publicReelsApi'
import { Reels } from '../../interface/ReelsInterface'

const saved: number[] = [1, 2, 3, 4, 5]

const Profile = () => {
  const { id } = useParams<{ id: string }>()
  const [value, setValue] = React.useState('posts')
  const [reels, setReels] = useState<Reels[]>([])
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
    if (value === 'posts' && user) {
      getPostByUser(user.id).then((data) => {
        if (data) {
          setPost(data)
        }
      })
    } else if (value === 'reels' && user) {
      getReelsByUser(user.id).then((data) => {
        if (data) {
          setReels(data)
        }
      })
    }
  }, [value, user])

  const [savePost, setSavePosts] = useState<any[]>([])

  useEffect(() => {
    if (user?.saved) {
      Promise.all(user.saved.map((postId: string) => getPostById(postId)))
        .then((fetchedPosts) => {
          const validPosts = fetchedPosts.filter((post) => post !== null)
          setSavePosts(validPosts)
        })
        .catch((error) => {
          console.error('', error)
        })
    }
  }, [user?.saved])

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
              reels.map((item, index: number) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <UserReelsCard src={item.videoUrl} />
                </Grid>
              ))}
            {value === 'saved' &&
              savePost.map((item, index: number) => (
                <Grid item xs={4} lg={4} key={index}>
                  <UserPostCard post={item} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
