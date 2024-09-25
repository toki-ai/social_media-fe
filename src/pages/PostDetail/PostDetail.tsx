import React, { useEffect, useState } from 'react'
import PostCard from '../../components/Post/PostCard'
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  InputBase,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { Post } from '../../interface/PostInterface'
import Comment from '../../components/Comment/Comment'
import { UserProfile } from '../../interface/UserInterface'
import { getUserProfile } from '../../api/userApi'
import { getPostById } from '../../api/publicPostApi'

const PostDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = React.useState<Post | null>(null)
  const [comments, setComments] = React.useState<string>('')
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
    if (id) {
      try {
        getPostById(id).then((data) => {
          if (data) {
            setPost(data)
          } else {
            console.log('Failed to get post')
          }
        })
      } catch (error: any) {
        console.error(
          'Error: ',
          error.response ? error.response.data : error.message
        )
      }
    } else {
      console.error('Error: id is undefined')
    }
  }, [id])
  return (
    <Box sx={{ paddingX: 5 }}>
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          borderRadius: 1,
        }}
      >
        <Grid item lg={8}>
          {post && (
            <Box>
              <PostCard post={post} user={user} />
            </Box>
          )}
          <Card
            sx={{
              padding: 2,
              marginTop: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ margin: '0 10px' }} />
              <InputBase
                placeholder='Comment'
                sx={{
                  paddingLeft: 1,
                  borderRadius: '20px',
                  backgroundColor: 'transparent',
                  width: '90%',
                  border: '1px solid lightgray',
                  height: '40px',
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement
                    setComments(target.value)
                  }
                }}
              />
            </Box>
            <Divider sx={{ marginY: 3 }} />
            <Box>
              <Typography variant='h6'>{comments}</Typography>
              <Comment />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PostDetail
