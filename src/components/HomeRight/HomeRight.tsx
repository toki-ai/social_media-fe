import React, { useContext, useEffect, useState } from 'react'
import SuggestUserCard from './SuggestUserCard'
import { Card, Typography, Box, useTheme } from '@mui/material'
import SearchUser from '../Search/SearchUser'
import { getAllUser } from '../../api/publicApi/publicUserApi'
import { UserProfile } from '../../interface/UserInterface'
import { UserContext, UserContextType } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

const HomeRight: React.FC = () => {
  const theme = useTheme()
  const [userList, setUserList] = useState<UserProfile[] | null>(null)
  const currentUser = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      getAllUser().then((data) => {
        if (data) {
          const filteredUsers = data.filter((user) => {
            return (
              user.id !== currentUser?.user?.id &&
              currentUser?.user?.id !== undefined &&
              !user.followers.includes(currentUser.user.id)
            )
          })
          const firstFiveUsers = filteredUsers.slice(0, 5)
          setUserList(firstFiveUsers)
        }
      })
    }
  }, [currentUser])

  return (
    <Box>
      <SearchUser onUserSelect={(user) => navigate(`/profile/${user.id}`)} />
      <Box sx={{ paddingY: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',

            alignItems: 'center',
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{
              fontWeight: 'bold',
              color: theme.palette.text.secondary,
              fontSize: '13px',
            }}
          >
            Suggested for you
          </Typography>
          <Typography
            variant='caption'
            sx={{ fontWeight: 'bold', fontSize: '13px', paddingRight: '5px' }}
          >
            See all
          </Typography>
        </Box>
        <Box sx={{ marginTop: 1 }}>
          {userList?.map((user, index) => (
            <SuggestUserCard user={user} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default HomeRight
