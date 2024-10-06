import React, { useContext, useEffect, useState } from 'react'
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
import { Comment, CommentCreate, Post } from '../../interface/PostInterface'
import { UserProfile } from '../../interface/UserInterface'
import { getUserProfile } from '../../api/userApi'
import { getPostById } from '../../api/publicApi/publicPostApi'
import { UserContext } from '../../context/userContext'
import SendIcon from '@mui/icons-material/Send'
import { createComment } from '../../api/commentApi'
import CommentItem from '../../components/CommentItem/CommentItem'

const PostDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = React.useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [value, setValue] = useState<string>('')
  const [user, setUser] = useState<UserProfile | null>(null)
  const userContext = useContext(UserContext)
  const currentUser = userContext ? userContext.user : null

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
            setComments(data.comments)
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

  const handleSubmitComment = (comment: string) => {
    console.log('roi')
    const newComment: CommentCreate = {
      content: comment,
    }
    if (post)
      createComment(newComment, post?.id).then((data) => {
        if (data) {
          console.log(data)
          setComments([...comments, data])
          setValue('')
        }
      })
  }

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
            {currentUser != null && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 2,
                  gap: 2,
                  paddingX: 1,
                }}
              >
                <Avatar src={currentUser.image} />
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <InputBase
                    placeholder='write a comment...'
                    sx={{
                      paddingLeft: 1,
                      borderRadius: '20px',
                      backgroundColor: 'transparent',
                      width: '100%',
                      border: '1px solid lightgray',
                      height: '40px',
                      paddingRight: '40px',
                    }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement
                        handleSubmitComment(target.value)
                      }
                    }}
                  />
                  <SendIcon
                    sx={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleSubmitComment(value)
                    }}
                  />
                </Box>
              </Box>
            )}
            <Box sx={{ paddingX: 1 }}>
              {comments.map((comment, index) => (
                <CommentItem comment={comment} key={index} />
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PostDetail
