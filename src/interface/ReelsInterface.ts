import { UserProfile } from './UserInterface'

export interface Reels {
  id: string
  title: string
  videoUrl: string
  user: UserProfile
}

export interface ReelsCreate {
  title: string
  videoUrl: string
}
