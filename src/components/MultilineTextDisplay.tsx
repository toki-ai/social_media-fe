import { Typography } from "@mui/material"

export const MultilineTextDisplay = ({ text }: { text: string }) => {
  return (
    <Typography
      component='div'
      dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}
    />
  )
}