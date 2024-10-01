import { Post } from './PostInterface'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  image: string
  following: string[]
  followers: string[]
  saved: Post[]
}

export interface UserUpdate {
  firstName: string
  lastName: string
  image: string
}

export interface AuthState {
  jwt: string | null
  error: string | Error | null
  loading: boolean
  user: UserProfile | null
}
