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
} from '@mui/material'
import { UserProfile } from '../../interface/UserInterface'
import { searchUser } from '../../api/publicApi/publicUserApi'

interface SearchBarProps {
  onUserSelect: (user: UserProfile) => void
}

const SearchUser: React.FC<SearchBarProps> = ({ onUserSelect }) => {
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
      <TextField
        label='Search user'
        variant='outlined'
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
        }}
      />
      {userList.length > 0 && (
        <Card
          sx={{
            position: 'absolute',
            width: '300px',
            zIndex: 2,
          }}
        >
          {userList.map((user, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                paddingY: '15px',
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
                {user.firstName + '' + user.lastName}
              </Typography>
              <Divider />
            </Box>
          ))}
        </Card>
      )}
    </>
  )
}

export default SearchUser
