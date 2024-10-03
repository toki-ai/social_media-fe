import { Box, Button, Menu, MenuItem, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import SortIcon from '@mui/icons-material/Sort'
import { UserContext } from '../../context/userContext'
import { ThemeContext } from '../../context/themeContext'

const MoreSelectorSideBar: React.FC<{ isFull: boolean }> = ({ isFull }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider')
  }
  const { setUser } = context
  const path = window.location.pathname

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    handleClose()
    if (!(path === '/' || path === '/reels')) {
      window.location.reload()
    }
  }

  const theme = useTheme()
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    return null
  }

  const { toggleTheme, isDarkMode } = themeContext

  const handleChangeTheme = () => {
    toggleTheme()
    handleClose()
  }

  return (
    <Box sx={{ marginTop: '10px' }}>
      <Box>
        <Button
          id='demo-positioned-button'
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '10px',
            color: theme.palette.text.primary,
            textTransform: 'capitalize',
            fontSize: '17px',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            paddingLeft: isFull ? '0px' : '20px',
          }}
        >
          <SortIcon />
          {isFull ? 'More' : ''}
        </Button>

        <Menu
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            width: '150%',
          }}
          PaperProps={{
            sx: {
              marginTop: '-60px',
              boxShadow: '0px 0px 2px lightgray',
              '& .MuiMenu-list': { padding: '0' },
            },
          }}
        >
          <MenuItem onClick={handleChangeTheme}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default MoreSelectorSideBar
