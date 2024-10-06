import {
  Box,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { Post } from '../../interface/PostInterface'
import { searchPost } from '../../api/publicApi/publicPostApi'
import UserPostCard from '../../components/Post/UserPostCard'

const SearchPost = () => {
  const [searchValue, setSearchValue] = React.useState<string>('')
  const [notFound, setNotFound] = React.useState<boolean>(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == '') {
      setNotFound(false)
      setListPost([])
    }
    const query = event.target.value
    setSearchValue(query)

    if (query) {
      setLoading(true)
      searchPost(query)
        .then((data) => {
          if (data) {
            if (data.length === 0) {
              setNotFound(true)
              setListPost([])
              setLoading(false)
            } else {
              setNotFound(false)
              setListPost(data)
              setLoading(false)
            }
          }
        })
        .catch((error) => {
          console.error('API Error:', error)
        })
    }
  }
  const [loading, setLoading] = React.useState<boolean>(false)
  const [listPost, setListPost] = React.useState<Post[]>([])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ marginY: 5, width: '80%' }}>
        <TextField
          label='Search post'
          variant='standard'
          value={searchValue}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: loading ? (
              <CircularProgress color='inherit' size={20} />
            ) : null,
          }}
          sx={{
            position: 'relative',
            width: '100%',
            marginBottom: 5,
          }}
        />
        {notFound && (
          <Box display='flex' justifyContent='center'>
            <Card sx={{ paddingY: '30px', paddingX: '50px' }}>
              <Typography color='error'>No post found</Typography>
            </Card>
          </Box>
        )}
        {listPost.length > 0 && (
          <Grid container spacing={2}>
            {listPost.map((post, index) => (
              <Grid item xs={4} lg={4} key={index}>
                <UserPostCard post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  )
}

export default SearchPost
