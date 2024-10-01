import {
  Button,
  Card,
  Divider,
  Menu,
  MenuItem,
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'
import React from 'react'
import { navigationMenu } from './SideBarNavigation'
import { useNavigate } from 'react-router-dom'
import MoreSelectorSideBar from './MoreSelectorSideBar'

const MiniSideBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const theme = useTheme()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card
      sx={{
        height: '100vh',
        width: '100%',
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
        <Box sx={{ height: '10%' }}></Box>
        <Box sx={{ height: '75%' }}>
          {navigationMenu.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
                padding: '17px',
                justifyContent: 'center',
                borderRadius: '5px',
                '&:hover': { backgroundColor: theme.palette.action.hover },
                backgroundColor:
                  item.title == 'Messages'
                    ? theme.palette.action.hover
                    : 'transparent',
              }}
              onClick={() => {
                if (item.path) navigate(item.path)
              }}
            >
              {item.icon && <item.icon />}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            height: '15%',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            paddingTop: '10px',
          }}
        >
          <MoreSelectorSideBar isFull={false} />
        </Box>
      </Box>
    </Card>
  )
}

export default MiniSideBar
