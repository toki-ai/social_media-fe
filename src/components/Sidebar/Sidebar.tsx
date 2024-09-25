import {
  Button,
  Card,
  Divider,
  Menu,
  MenuItem,
  Box,
  Typography,
} from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'
import React from 'react'
import { navigationMenu } from './SideBarNavigation'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card className='h-screen flex flex-col justify-between py-5 fixed pr-20'>
      <Box className='space-y-8 pl-7'>
        <Typography variant='h5' className='logo font-bold'>
          Your Hometown
        </Typography>
        <Box className='space-y-10 pt-5'>
          {navigationMenu.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
                marginTop: '30px',
                paddingLeft: '20px',
              }}
              onClick={() => {
                if (item.path) navigate(item.path)
              }}
            >
              {item.icon && <item.icon />}
              <Typography variant='h6'>{item.title}</Typography>
            </Box>
          ))}
        </Box>
        <Divider sx={{ paddingTop: '20px' }} />
        <Box className='cursor-pointer flex space-x-3 items-center'>
          <SortIcon />
          <Box>
            <Button
              id='demo-positioned-button'
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              More
            </Button>
            <Menu
              id='demo-positioned-menu'
              aria-labelledby='demo-positioned-button'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default SideBar
