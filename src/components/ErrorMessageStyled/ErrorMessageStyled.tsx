import { Typography } from '@mui/material'

export const ErrorMessageStyled = ({
  children,
}: {
  children?: React.ReactNode
}) => (
  <Typography sx={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
    {children}
  </Typography>
)
