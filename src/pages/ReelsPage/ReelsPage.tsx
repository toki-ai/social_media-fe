import { Box, Card } from '@mui/material'
import ReelsCard from '../../components/ReelsCard/ReelsCard'
import { useEffect, useState } from 'react'
import { getAllReels } from '../../api/publicApi/publicReelsApi'
import type { Reels } from '../../interface/ReelsInterface'

const ReelsPage = () => {
  const [reels, setReels] = useState<Reels[] | null>(null)
  useEffect(() => {
    getAllReels().then((data) => {
      if (data) {
        setReels(data)
      }
    })
  }, [])
  return (
    <Box
      sx={{
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        marginY: 2,
      }}
    >
      <Box>
        {reels ? (
          reels.map((reel, index) => <ReelsCard key={index} reels= {reel}/>)
        ) : (
          <Card>No Reels Find</Card>
        )}
      </Box>
    </Box>
  )
}

export default ReelsPage
