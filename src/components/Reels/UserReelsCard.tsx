import React from 'react'

interface UserReelsCardProps {
  src: string
}

const UserReelsCard: React.FC<UserReelsCardProps> = ({ src }) => {
  return (
    <div className='w-full aspect-[2/3]'>
      <video controls className='w-full h-full object-cover' src={src}></video>
    </div>
  )
}

export default UserReelsCard
