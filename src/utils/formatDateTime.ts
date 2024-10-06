export const formatDateTime = (dateString: string) => {
  const postDate = new Date(dateString)
  const now = new Date()

  const diffInMilliseconds = now.getTime() - postDate.getTime()
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`
  } else if (diffInHours < 24) {
    return `${diffInHours}h`
  } else {
    return `${diffInDays}d`
  }
}

export const getChatHour = (dateString: string) => {
  const date = new Date(dateString)
  if (date.getMinutes() < 10) return date.getHours() + ':0' + date.getMinutes()
  return date.getHours() + ':' + date.getMinutes()
}

export const getChatDate = (dateString: string) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const date = new Date(dateString)
  return (
    date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear()
  )
}
