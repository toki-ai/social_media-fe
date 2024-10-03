import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import SendIcon from '@mui/icons-material/Send'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ForumIcon from '@mui/icons-material/Forum'
import React, { useState } from 'react'
import { Post } from '../../interface/PostInterface'
import { useNavigate } from 'react-router-dom'
import { MultilineTextDisplay } from '../MultilineTextDisplay'
import { UserProfile } from '../../interface/UserInterface'
import { isLikeByRecentUser } from '../../utils/isLikeByRecentUser'
import { likePost, savePost } from '../../api/postApi'
import { formatDateTime } from '../../utils/formatDateTime'
import { isSaevByRecentUser } from '../../utils/isSaveByRecentUser'

const PostCard: React.FC<{
  post: Post
  user: UserProfile | null | undefined
}> = ({ post, user }) => {
  const [isLiked, setIsLiked] = useState(
    user != null && isLikeByRecentUser(user.id, post)
  )
  const [isSaved, setIsSaved] = useState<boolean>(
    user != null && isSaevByRecentUser(user, post.id)
  )
  // const isSaved = false
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/post/${post.id}`)
  }
  const handleLikePost = () => {
    if (user == null) {
      navigate(`/login`)
    } else {
      likePost(post.id)
      setIsLiked(!isLiked)
    }
  }
  const handleSelectProfile = (id: string) => {
    navigate(`/profile/${id}`)
  }

  const handleSave = () => {
    if (user == null) {
      navigate(`/login`)
    } else {
      savePost(post.id)
      setIsSaved(!isSaved)
    }
  }
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            src={post.user.image}
            sx={{
              bgcolor: red[500],
              cursor: 'pointer',
              width: '35px',
              height: '35px',
            }}
            aria-label='recipe'
            onClick={() => handleSelectProfile(post.user.id)}
          />
        }
        title={
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Typography
              variant='body1'
              onClick={() => handleSelectProfile(post.user.id)}
              sx={{
                '&:hover': { color: 'black' },
                cursor: 'pointer',
                color: 'black',
              }}
            >
              @{post.user.firstName.toLocaleLowerCase()}_
              {post.user.lastName.toLocaleLowerCase()}{' '}
            </Typography>
            <Typography variant='body1' sx={{ color: 'gray' }}>
              • {formatDateTime(post.date)}
            </Typography>
          </Box>
        }
      />
      <Box sx={{ cursor: 'pointer' }}>
        {post.image && (
          <CardMedia
            component='img'
            image={post.image}
            alt='post media'
            onClick={handleClick}
            sx={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        )}
        {post.video && (
          <CardMedia
            component='video'
            controls
            src={post.video}
            onClick={handleClick}
            sx={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        )}
        <CardContent>
          <MultilineTextDisplay text={post.caption} />
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
          <Box>
            <IconButton aria-label='add to favorites' onClick={handleLikePost}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton aria-label='share'>
              <SendIcon />
            </IconButton>
            <IconButton aria-label='comment' onClick={handleClick}>
              <ForumIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton aria-label='save' onClick={handleSave}>
              {!isSaved ? <BookmarkBorderIcon /> : <BookmarkIcon />}
            </IconButton>
          </Box>
        </CardActions>
      </Box>
      <Divider />
    </Card>
  )
}

export default PostCard
