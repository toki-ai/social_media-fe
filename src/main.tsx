import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Router/index.tsx'
import { CustomThemeProvider } from './context/themesContext.tsx'
;(window as any).global = window

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider>
      <RouterProvider router={router} />
    </CustomThemeProvider>
  </StrictMode>
)
