import React, { createContext, useState, useMemo, ReactNode } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from '../themes/themes'

interface ThemeContextProps {
  toggleTheme: () => void
  isDarkMode: boolean
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
)

interface ThemeProviderProps {
  children: ReactNode
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  const currentTheme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  )

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
