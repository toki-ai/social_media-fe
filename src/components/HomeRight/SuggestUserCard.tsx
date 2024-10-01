import { Avatar, Button, Box, Typography, useTheme } from '@mui/material'
import { UserProfile } from '../../interface/UserInterface'
import { useNavigate } from 'react-router-dom'

const SuggestUserCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 0,
        paddingY: '10px',
        width: '100%',
      }}
    >
      <Box
        onClick={() => {
          navigate(`/profile/${user.id}`)
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Avatar aria-label='recipe' src={user.image} />
        <Box sx={{ marginLeft: '10px' }}>
          <Typography sx={{ fontSize: '14px' }}>
            {user.firstName + ' ' + user.lastName}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: theme.palette.grey[500],
            }}
          >
            {'@' +
              user.firstName.toLowerCase() +
              '_' +
              user.lastName.toLowerCase()}
          </Typography>
        </Box>
      </Box>
      <Button
        size='small'
        sx={{
          textTransform: 'capitalize',
          fontSize: '12px',
          fontWeight: '700',
          paddingY: '10px',
        }}
      >
        Follow
      </Button>
    </Box>
  )
}

export default SuggestUserCard
