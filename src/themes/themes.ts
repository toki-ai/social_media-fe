import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: '16',
      fontWeight: 700,
    },
    h3: {
      fontSize: '17px',
    },
    body1: {
      fontWeight: 400,
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    action: {
      hover: '#262626',
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: '16',
      fontWeight: 700,
    },
    h3: {
      fontSize: '17px',
    },
    body1: {
      fontWeight: 400,
    },
  },
})
