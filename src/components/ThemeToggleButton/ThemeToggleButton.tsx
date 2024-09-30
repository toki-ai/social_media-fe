import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { ThemeContext } from '../../context/themesContext'
const ThemeToggleButton: React.FC = () => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    return null
  }

  const { toggleTheme, isDarkMode } = themeContext

  return (
    <Button variant='contained' onClick={toggleTheme}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </Button>
  )
}

export default ThemeToggleButton
