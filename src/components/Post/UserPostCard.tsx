import React from 'react'

interface UserPostCardProps {
  src: string
}

const UserPostCard: React.FC<UserPostCardProps> = ({ src }) => {
  return (
    <div className='w-full aspect-square cursor-pointer'>
      <img src={src} alt='' className='object-cover w-full h-full' />
    </div>
  )
}

export default UserPostCard
