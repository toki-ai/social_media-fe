import { Avatar, Button } from '@mui/material'

const ProfileHeader = () => {
  return (
    <div className='inline-block w-full'>
      <div className='flex'>
        <div className='w-[30%]'>
          <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
            <Avatar
              sx={{ width: '10rem', height: '10rem' }}
              src='https://i.pinimg.com/280x280_RS/b4/19/fd/b419fd337d42a639bba952a351f22d73.jpg'
            />
          </div>
        </div>
        <div className='w-[70%]'>
          <div className='flex'>
            <span>toki._.ai</span>
            {true ? (
              <div>
                <Button
                  variant='contained'
                  size='small'
                  sx={{
                    backgroundColor: 'lightgrey',
                    color: 'black',
                    marginLeft: '10px',
                    boxShadow: 'none',
                    textTransform: 'none',
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
                    marginLeft: '10px',
                    boxShadow: 'none',
                    textTransform: 'none',
                  }}
                >
                  View achive
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant='contained'
                  size='small'
                  sx={{
                    backgroundColor: 'lightgrey',
                    color: 'black',
                    marginLeft: '10px',
                    boxShadow: 'none',
                    textTransform: 'none',
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
                    marginLeft: '10px',
                    boxShadow: 'none',
                    textTransform: 'none',
                  }}
                >
                  Message
                </Button>
              </div>
            )}
          </div>
          <div className='flex justify-between w-[50%]'>
            <span>5 posts</span>
            <span>83 followers</span>
            <span>213 following</span>
          </div>
          <div>
            <p>En Deo 🍊</p>
            <p>Don't let fear stop you from playing the game♟️✨</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
