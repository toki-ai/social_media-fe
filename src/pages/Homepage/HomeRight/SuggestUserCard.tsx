import { Avatar, Button, CardHeader } from '@mui/material'
import { red } from '@mui/material/colors'

interface SuggestUserCardProps {
  title?: string
  subheader?: string
}

const SuggestUserCard: React.FC<SuggestUserCardProps> = ({
  title,
  subheader,
}) => {
  return (
    <CardHeader
      sx={{ padding: '5px' }}
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
          R
        </Avatar>
      }
      action={<Button size='small'>Follow</Button>}
      title={title}
      subheader={subheader}
    />
  )
}

export default SuggestUserCard
