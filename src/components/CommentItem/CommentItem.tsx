import {
  Avatar,
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Comment } from '../../interface/PostInterface'
import { formatDateTime } from '../../utils/formatDateTime'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import {
  isLikeByRecentUser,
  isLikeCommentByRecentUser,
} from '../../utils/isLikeByRecentUser'
import { useNavigate } from 'react-router-dom'
import { likeComment } from '../../api/commentApi'

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const userContext = useContext(UserContext)
  const user = userContext ? userContext.user : null
  const [isLiked, setIsLiked] = useState(
    user != null && isLikeCommentByRecentUser(user.id, comment)
  )
  const theme = useTheme()
  const navigate = useNavigate()
  const handleLikeComment = () => {
    if (user == null) {
      navigate(`/login`)
    } else {
      likeComment(comment.id).then((data) => {
        setIsLiked(!isLiked)
      })
    }
  }
  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.palette.grey[400]}`,
        display: 'flex',
        gap: 2,
        paddingY: '20px',
        justifyContent: 'space-between',
      }}
    >
      <Box display='flex'>
        <Box>
          <Avatar
            src={comment.user.image}
            onClick={() => {
              navigate(`/profile/${comment.user.id}`)
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
        <Box>
          <Typography
            variant='body2'
            color='gray'
            sx={{ marginLeft: 1, color: theme.palette.text.primary }}
          >
            <Typography
              component='span'
              variant='body2'
              fontWeight='600'
              sx={{
                color: theme.palette.text.primary,
                paddingRight: 1,
                '&:hover': {
                  color: theme.palette.grey[400],
                },
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(`/profile/${comment.user.id}`)
              }}
            >
              {comment.user.firstName.toLocaleLowerCase()}_
              {comment.user.lastName.toLocaleLowerCase()}
            </Typography>
            {comment.content}
          </Typography>
          <Box>
            <Typography
              variant='body2'
              color={theme.palette.grey[300]}
              sx={{ marginLeft: 1, fontSize: '0.8rem', paddingTop: 1 }}
            >
              {formatDateTime(comment.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ paddingRight: 2, display: 'flex', alignItems: 'start' }}
        onClick={() => {
          handleLikeComment()
        }}
      >
        {isLiked ? (
          <FavoriteIcon sx={{ color: 'red', cursor: 'pointer' }} />
        ) : (
          <FavoriteBorderIcon sx={{ cursor: 'pointer' }} />
        )}
        <Typography
          variant='body2'
          sx={{ paddingTop: '2px', paddingLeft: '5px' }}
        >
          {comment.liked != null ? comment.liked.length : 0}
        </Typography>
      </Box>
    </Box>
  )
}

export default CommentItem
