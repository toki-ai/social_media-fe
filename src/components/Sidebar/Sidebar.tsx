import {
  Button,
  Card,
  Divider,
  Menu,
  MenuItem,
  Box,
  Typography,
} from '@mui/material'
import React, { useContext } from 'react'
import { navigationMenu } from './SideBarNavigation'
import { useNavigate } from 'react-router-dom'
import { UserContext, UserContextType } from '../../context/userContext'
import { UserProfile } from '../../interface/UserInterface'
import MoreSelectorSideBar from './MoreSelectorSideBar'
import { useTheme, Theme } from '@mui/material/styles'

const SideBar = () => {
  const navigate = useNavigate()
  const theme: Theme = useTheme()
  const { user }: { user: UserProfile | null } = useContext(
    UserContext
  ) as UserContextType
  const path = window.location.pathname

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <Card
      sx={{
        position: 'fixed',
        width: '250px',
        height: '100vh',
        paddingX: '20px',
        paddingY: '30px',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h1' sx={{ height: '10%' }}>
          Your Hometown
        </Typography>
        <Box
          sx={{
            height: '75%',
          }}
        >
          {navigationMenu.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
                padding: '17px',
                paddingLeft: '10px',
                borderRadius: '5px',
                '&:hover': { backgroundColor: theme.palette.action.hover },
              }}
              onClick={() => {
                if (item.path) navigate(item.path)
              }}
            >
              {item.icon && (
                <item.icon
                  sx={{ transform: path == item.path ? 'scale(1.1)' : '' }}
                />
              )}
              <Typography
                variant='h3'
                sx={{
                  paddingLeft: '10px',
                  fontWeight: path == item.path ? '700' : '400',
                  fontSize: path == item.path ? '17px' : '15px',
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            height: '15%',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <Divider />
          {user != null ? (
            <MoreSelectorSideBar isFull={true} />
          ) : (
            <Box>
              <Button
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginTop: '10px',
                  gap: '10px',
                  color: theme.palette.text.primary,
                  textTransform: 'capitalize',
                  fontSize: '17px',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  )
}

export default SideBar
