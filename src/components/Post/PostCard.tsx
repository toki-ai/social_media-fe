import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
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
import { likePost } from '../../api/postApi'

const PostCard: React.FC<{ post: Post; user: UserProfile | null }> = ({
  post,
  user,
}) => {
  const [isLiked, setIsLiked] = useState(
    user != null && isLikeByRecentUser(user.id, post)
  )
  const isBookmarked = true
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
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {post.user.lastName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={`${post.user.firstName} ${post.user.lastName}`}
        subheader={post.date}
      />
      <Box sx={{ cursor: 'pointer' }}>
        <CardMedia
          component='img'
          image={post.image ? post.image : post.video}
          alt='post media'
          onClick={handleClick}
        />
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
            <IconButton aria-label='save'>
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>
        </CardActions>
      </Box>
    </Card>
  )
}

export default PostCard
