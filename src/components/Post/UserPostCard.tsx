import React from 'react'
import { Card, CardMedia } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Post } from '../../interface/PostInterface'

interface UserPostCardProps {
  post: Post
}

const UserPostCard: React.FC<UserPostCardProps> = ({ post }) => {
  const navigate = useNavigate()
  const handleOpenPost = () => {
    navigate(`/post/${post.id}`)
  }
  return (
    <Card
      onClick={handleOpenPost}
      sx={{ width: '100%', aspectRatio: '1 / 1', cursor: 'pointer' }}
    >
      {post.image && (
        <CardMedia
          component='img'
          src={post.image ? post.image : post.video}
          alt=''
          sx={{ objectFit: 'cover', height: '100%' }}
        />
      )}
      {post.video && (
        <CardMedia
          component='video'
          controls
          src={post.video}
          sx={{ objectFit: 'cover', height: '100%' }}
        />
      )}
    </Card>
  )
}

export default UserPostCard
