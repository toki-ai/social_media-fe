import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import MovieIcon from '@mui/icons-material/Movie'
import AddIcon from '@mui/icons-material/Add'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Face2Icon from '@mui/icons-material/Face2'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'

export const navigationMenu = [
  {
    title: 'Home',
    icon: HomeIcon,
    path: '/',
  },
  {
    title: 'Search',
    icon: SearchIcon,
    path: '/search',
  },
  {
    title: 'Reels',
    icon: MovieIcon,
    path: '/reels',
  },
  {
    title: 'Create Reels',
    icon: AddIcon,
    path: '/reels/create',
  },
  {
    title: 'Messages',
    icon: ChatBubbleOutlineOutlinedIcon,
    path: '/direct/inbox',
  },
  {
    title: 'Notifications',
    icon: FavoriteBorderIcon,
    path: '/notifications',
  },
  {
    title: 'Profile',
    icon: Face2Icon,
    path: '/profile/1',
  },
  {},
]
