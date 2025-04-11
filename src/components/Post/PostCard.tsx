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
  Menu,
  MenuItem,
  Modal,
  TextField,
  Button,
} from '@mui/material'
import { red } from '@mui/material/colors'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ForumIcon from '@mui/icons-material/Forum'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import React, { useState } from 'react'
import { Post, PostCreate } from '../../interface/PostInterface'
import { useNavigate, useLocation } from 'react-router-dom'
import { MultilineTextDisplay } from '../MultilineTextDisplay'
import { UserProfile } from '../../interface/UserInterface'
import { isLikeByRecentUser } from '../../utils/isLikeByRecentUser'
import { likePost, savePost, deletePost, updatePost } from '../../api/postApi'
import { formatDateTime } from '../../utils/formatDateTime'
import { isSaevByRecentUser } from '../../utils/isSaveByRecentUser'
import { Diversity1 } from '@mui/icons-material'

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [updatedCaption, setUpdatedCaption] = useState(post.caption)
  const navigate = useNavigate()
  const location = useLocation()
  const isDetailView = location.pathname.startsWith('/post/')
  const isPostOwner = user?.id === post.user.id

  const handleClick = () => {
    navigate(`/post/${post.id}`)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDeletePost = async () => {
    const success = await deletePost(post.id)
    if (success) {
      alert('Post deleted successfully')
      window.location.reload()
    }
    handleMenuClose()
  }

  const handleUpdatePost = async () => {
    const updatedPost: PostCreate = {
      caption: updatedCaption,
      image: post.image,
      video: post.video,
    }
    const success = await updatePost(post.id, updatedPost)
    if (success) {
      alert('Post updated successfully')
      window.location.reload()
    }
    setOpenUpdateModal(false)
    handleMenuClose()
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

  const handleShare = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`
    navigator.clipboard.writeText(postUrl).then(() => {
      alert('Link copied to clipboard!')
    })
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
        action={
          isPostOwner && (
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          )
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setOpenUpdateModal(true)
            handleMenuClose()
          }}
        >
          Update Post
        </MenuItem>
        <MenuItem onClick={handleDeletePost} sx={{ color: 'red' }}>
          Delete Post
        </MenuItem>
      </Menu>
      <Modal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        aria-labelledby='update-post-modal'
        aria-describedby='update-post-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant='h6' component='h2' gutterBottom>
            Update Post
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={updatedCaption}
            onChange={(e) => setUpdatedCaption(e.target.value)}
            variant='outlined'
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setOpenUpdateModal(false)}>Cancel</Button>
            <Button variant='contained' onClick={handleUpdatePost}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
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
          <Box display='flex'>
            <Box
              display='flex'
              alignItems='center'
              sx={{ paddingRight: '20px' }}
            >
              <IconButton
                aria-label='add to favorites'
                onClick={handleLikePost}
              >
                {isLiked ? (
                  <FavoriteIcon sx={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography variant='body2'>{post.liked.length}</Typography>
            </Box>
            <Box
              display='flex'
              alignItems='center'
              sx={{ paddingRight: '20px' }}
            >
              <IconButton aria-label='comment' onClick={handleClick}>
                <ForumIcon />
              </IconButton>
              <Typography variant='body2'>{post.comments.length}</Typography>
            </Box>
            <IconButton aria-label='share' onClick={handleShare}>
              <InsertLinkIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton aria-label='save' onClick={handleSave}>
              {!isSaved ? <BookmarkBorderIcon /> : <BookmarkIcon />}
            </IconButton>
          </Box>
        </CardActions>
        {!isDetailView && post.comments.length > 0 && (
          <CardContent>
            <Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar
                  src={post.comments[0].user.image}
                  sx={{ width: 24, height: 24, mr: 1 }}
                />
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                  {post.comments[0].user.firstName}{' '}
                  {post.comments[0].user.lastName}
                </Typography>
              </Box>
              <Typography variant='body2' color='text.secondary'>
                {post.comments[0].content}
              </Typography>
            </Box>
          </CardContent>
        )}
      </Box>
      <Divider />
    </Card>
  )
}

export default PostCard
