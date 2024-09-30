import React from 'react'
import SuggestUserCard from './SuggestUserCard'
import { Card, Typography, Box } from '@mui/material'
import SearchUser from '../Search/SearchUser'

const popularUsers: number[] = [1, 2, 3, 4, 5]

const HomeRight: React.FC = () => {
  return (
    <Box sx={{ paddingRight: 5 }}>
      <SearchUser onUserSelect={(user) => console.log(user)} />
      <Card sx={{ padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingY: 2,
            alignItems: 'center',
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 'bold', opacity: 0.7 }}
          >
            Suggested for you
          </Typography>
          <Typography
            variant='caption'
            sx={{ fontWeight: 'bold', opacity: 0.95 }}
          >
            See all
          </Typography>
        </Box>
        <Box sx={{ marginTop: 1 }}>
          {popularUsers.map((userId) => (
            <SuggestUserCard key={userId} title='Title' subheader='subheader' />
          ))}
        </Box>
      </Card>
    </Box>
  )
}

export default HomeRight
