import { Avatar, Box } from '@mui/material'

interface StoryCircleProps {
  source: string
}

const StoryCircle: React.FC<StoryCircleProps> = ({ source }) => {
  return (
    <Box className='flex flex-col items-center mr-4 cursor-pointer'>
      <Avatar src={source} sx={{ width: 48, height: 48 }} />
    </Box>
  )
}

export default StoryCircle
