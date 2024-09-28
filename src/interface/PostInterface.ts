import { UserProfile } from './UserInterface'

export interface Comment {
  id: string
  content: string
  createdAt: string
  user: UserProfile
  liked: UserProfile[]
}

export interface CommentCreate {
  content: string
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
