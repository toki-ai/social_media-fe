import { Avatar, Box } from '@mui/material'

const StoryCircle = () => {
  return (
    <Box className='flex flex-col items-center mr-4 cursor-pointer'>
      <Avatar
        src='https://i.pinimg.com/564x/7b/8e/76/7b8e7603c2475daf3359089ed095a2ed.jpg'
        sx={{ width: 48, height: 48 }} // Sử dụng giá trị pixel cho kích thước
      />
    </Box>
  )
}

export default StoryCircle
