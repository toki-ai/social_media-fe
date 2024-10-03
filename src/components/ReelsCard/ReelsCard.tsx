import { Box, Avatar, Typography, Card, CardMedia } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useRef, useState } from 'react'
import { Reels } from '../../interface/ReelsInterface'

const ReelsCard: React.FC<{ reels: Reels }> = ({ reels }) => {
  const [isFullContent, setIsFullContent] = useState<boolean>(false)
  const handleFullContent = () => {
    setIsFullContent(!isFullContent)
  }
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleLoadStart = () => {
    if (videoRef.current) {
      videoRef.current.play() // Play video when it starts loading
      setIsPlaying(true) // Set isPlaying to true
    }
  }

  return (
    <Box
      sx={{
        width: '350px',
        height: '650px',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        margin: '10px',
      }}
    >
      <Card sx={{ height: '100%', width: '100%', position: 'relative' }}>
        <CardMedia
          component='video'
          src={reels.videoUrl}
          sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
          ref={videoRef} // Attach ref to the video element
          onClick={togglePlay} // Allow video to be toggled by clicking on it
          onLoadStart={handleLoadStart} // Start playing when the video starts loading
        />
        {/* Custom Play Button */}
        {!isPlaying && (
          <Box
            onClick={togglePlay}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'rgba(0, 0, 0, 0.5)', // Background for better visibility
              borderRadius: '50%',
              p: 1,
              cursor: 'pointer',
              zIndex: 10, // Ensure it's above the video
            }}
          >
            <PlayArrowIcon sx={{ color: 'white', fontSize: 50 }} />
          </Box>
        )}
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            color: 'white',
            paddingX: '20px',
            paddingBottom: '30px',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt='Profile'
              src={reels.user.image}
              sx={{ marginRight: '10px' }}
            />
            <Typography variant='subtitle2'>
              {reels.user.firstName + reels.user.lastName}
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: '10px',
              height: isFullContent ? 'auto' : '20px',
              whiteSpace: isFullContent ? 'wrap' : 'nowrap',
              overflow: isFullContent ? 'visible' : 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            }}
            onClick={handleFullContent}
          >
            {reels.title.length > 30 ? (
              <Typography variant='caption'>
                {isFullContent
                  ? reels.title
                  : `${reels.title.substring(0, 30)}...`}
                {!isFullContent && <span style={{ color: 'blue' }}> more</span>}
              </Typography>
            ) : (
              <Typography variant='caption'>{reels.title}</Typography>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default ReelsCard
