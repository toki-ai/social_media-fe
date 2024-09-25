import { date } from 'yup'
import { UserProfile } from './UserInterface'

export interface Comment {
  id: string
  content: string
  createdAt: string
  user: string
  liked: string[]
}

export interface Post {
  id: string
  caption: string
  image: string
  video: string
  user: UserProfile
  liked: UserProfile[]
  comments: Comment[]
  date: string
}

export interface PostCreate {
  caption: string
  image: string
  video: string
}
