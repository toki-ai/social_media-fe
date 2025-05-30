import React, { useState } from 'react'
import {
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  useTheme,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { UserProfile } from '../../interface/UserInterface'
import { searchUser } from '../../api/publicApi/publicUserApi'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  onUserSelect: (user: UserProfile) => void
  style: 'filled' | 'outlined' | 'standard'
  placeholder?: string
}

const SearchUser: React.FC<SearchBarProps> = ({
  onUserSelect,
  style,
  placeholder = 'Search user',
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [userList, setUserList] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const theme = useTheme()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == '') {
      setUserList([])
    }
    const query = event.target.value
    setSearchValue(query)

    if (query) {
      setLoading(true)
      searchUser(query)
        .then((data) => {
          if (data) {
            setUserList(Array.isArray(data) ? data : [data])
            setLoading(false)
          }
        })
        .catch((error) => {
          console.error('API Error:', error)
        })
    }
  }

  const handleSelectUser = (user: UserProfile) => {
    onUserSelect(user)
    setSearchValue('')
    setUserList([])
  }

  return (
    <>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <TextField
          placeholder={placeholder}
          variant={style}
          value={searchValue}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: loading ? (
              <CircularProgress color='inherit' size={20} />
            ) : null,
            sx: {
              borderRadius: '20px',
              bgcolor: 'background.paper',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              pl: 2,
              py: 0,
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
          }}
        />
        {userList.length > 0 && (
          <Card
            sx={{
              position: 'absolute',
              width: '100%',
              zIndex: 2,
              mt: 0.5,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            {userList.map((user, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  paddingY: '0px',
                  paddingX: '20px',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: theme.palette.action.hover,
                  },
                }}
                onClick={() => handleSelectUser(user)}
              >
                <Avatar src={user.image}></Avatar>
                <Typography
                  variant='body1'
                  sx={{
                    '&:active': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {user.firstName + ' ' + user.lastName}
                </Typography>
              </Box>
            ))}
          </Card>
        )}
      </Box>
    </>
  )
}

export default SearchUser
