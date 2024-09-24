import { Avatar, Button, Box, Typography } from '@mui/material'

const ProfileHeader = () => {
  const isEditMode = true

  return (
    <Box display='flex' width='100%' mt={5}>
      <Box
        width='30%'
        display='flex'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Avatar
          sx={{ width: '10rem', height: '10rem' }}
          src='https://i.pinimg.com/280x280_RS/b4/19/fd/b419fd337d42a639bba952a351f22d73.jpg'
        />
      </Box>
      <Box width='70%' pl={2}>
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' component='span'>
            toki._.ai
          </Typography>
          {isEditMode ? (
            <Box ml={2}>
              <Button
                variant='contained'
                size='small'
                sx={{
                  backgroundColor: 'lightgrey',
                  color: 'black',
                  boxShadow: 'none',
                  textTransform: 'none',
                  marginLeft: '10px',
                }}
              >
                Edit profile
              </Button>
              <Button
                variant='contained'
                size='small'
                sx={{
                  backgroundColor: 'lightgrey',
                  color: 'black',
                  boxShadow: 'none',
                  textTransform: 'none',
                  marginLeft: '10px',
                }}
              >
                View archive
              </Button>
            </Box>
          ) : (
            <Box ml={2}>
              <Button
                variant='contained'
                size='small'
                sx={{
                  backgroundColor: 'lightgrey',
                  color: 'black',
                  boxShadow: 'none',
                  textTransform: 'none',
                  marginLeft: '10px',
                }}
              >
                Following
              </Button>
              <Button
                variant='contained'
                size='small'
                sx={{
                  backgroundColor: 'lightgrey',
                  color: 'black',
                  boxShadow: 'none',
                  textTransform: 'none',
                  marginLeft: '10px',
                }}
              >
                Message
              </Button>
            </Box>
          )}
        </Box>
        <Box display='flex' justifyContent='space-between' width='50%' mt={1}>
          <Typography variant='body2'>5 posts</Typography>
          <Typography variant='body2'>83 followers</Typography>
          <Typography variant='body2'>213 following</Typography>
        </Box>
        <Box mt={1}>
          <Typography variant='body1'>En Deo 🍊</Typography>
          <Typography variant='body2'>
            Don't let fear stop you from playing the game♟️✨
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileHeader
