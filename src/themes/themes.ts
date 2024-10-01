import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f9bf7',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#e83b46',
    },
    grey: {
      500: '#747474',
    },
    text: {
      primary: '#000000',
      secondary: '#4c4c4c',
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: '16',
      fontWeight: 700,
    },
    h2: {
      fontSize: '16',
      fontWeight: 400,
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
    error: {
      main: '#e83b46',
    },
    grey: {
      500: '#747474',
    },
    action: {
      hover: '#262626',
    },
    text: {
      primary: '#ffffff',
      secondary: '#4c4c4c',
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
