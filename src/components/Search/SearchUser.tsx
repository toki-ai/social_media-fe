import React, { useState } from 'react'
import {
  TextField,
  CircularProgress,
  Popover,
  List,
  ListItemText,
  ListItemButton,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material'
import { UserProfile } from '../../interface/UserInterface'
import { searchUser } from '../../api/publicPostApi'

interface SearchBarProps {
  onUserSelect: (user: UserProfile) => void
}

const SearchUser: React.FC<SearchBarProps> = ({ onUserSelect }) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [userList, setUserList] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input change:', event.target.value)
    const query = event.target.value
    setSearchValue(query)

    if (query) {
      setLoading(true)
      searchUser(query)
        .then((data) => {
          console.log('API Response:', data)
          if (data) setUserList(Array.isArray(data) ? data : [data])
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
        sx={{ position: 'relative' }}
      />
      {userList &&
        userList.map((user, index) => (
          <Card
            key={index}
            onClick={() => handleSelectUser(user)}
            sx={{
              position: 'absolute',
              paddingTop: `${index * 50}px`,
              zIndex: `${userList.length - index + 1}`,
            }}
          >
            <CardContent>
              <Typography variant='body1'>{user.firstName}</Typography>
            </CardContent>
          </Card>
        ))}
    </>
  )
}

export default SearchUser
