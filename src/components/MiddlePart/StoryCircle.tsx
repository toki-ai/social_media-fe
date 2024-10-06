import { Avatar, Box, Typography, useTheme } from '@mui/material'
import { UserProfile } from '../../interface/UserInterface'

interface StoryCircleProps {
  user: UserProfile
}

const StoryCircle: React.FC<StoryCircleProps> = ({ user }) => {
  const theme = useTheme()
  return (
    <Box
      display='flex'
      justifyContent='center'
      flexDirection='column'
      alignItems='center'
    >
      <Box
        sx={{
          padding: '2px',
          borderRadius: '50%',
          background:
            'conic-gradient( #99dcff 0% 15%, #259cd9 25% 40%, #cc47ab 50% 65%, #ffb0eb 75% 80%, #99dcff 95%)',
        }}
      >
        <Avatar
          src={user.image}
          sx={{
            width: 48,
            height: 48,
            opacity: 0.9,
          }}
        />
      </Box>
      <Typography
        variant='body2'
        sx={{
          fontSize: '10px',
          paddingTop: '5px',
          color: theme.palette.grey[600],
        }}
      >
        {user.firstName.toLowerCase() + '_' + user.lastName.toLowerCase()}
      </Typography>
    </Box>
  )
}

export default StoryCircle
