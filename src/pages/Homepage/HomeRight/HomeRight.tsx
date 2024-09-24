import SearchUser from '../../../components/Search/SearchUser'
import SuggestUserCard from './SuggestUserCard'
import { Card, Typography, Box } from '@mui/material'

const popularUsers: number[] = [1, 2, 3, 4, 5]

const HomeRight = () => {
  return (
    <Box sx={{ paddingRight: 5 }}>
      <SearchUser />
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
            <SuggestUserCard key={userId} />
          ))}
        </Box>
      </Card>
    </Box>
  )
}

export default HomeRight
