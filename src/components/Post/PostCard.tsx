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
import React from 'react'
import { Post } from '../../interface/PostInterface'
import { useNavigate } from 'react-router-dom'
import { MultilineTextDisplay } from '../MultilineTextDisplay'

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const isFavorited = true
  const isBookmarked = true
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/post/${post.id}`)
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
      <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <CardMedia
          component='img'
          image={post.image ? post.image : post.video}
          alt='post media'
        />
        <CardContent>
          <MultilineTextDisplay text={post.caption} />
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
          <Box>
            <IconButton aria-label='add to favorites'>
              {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton aria-label='share'>
              <SendIcon />
            </IconButton>
            <IconButton aria-label='comment'>
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
