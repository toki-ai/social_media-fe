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
  gender: string
}

export interface UserProfile {
  id: string
  firstname: string
  lastname: string
  email: string
  gender: string
  following: string[]
  followers: string[]
  saved: Post[]
}

export interface AuthState {
  jwt: string | null
  error: string | Error | null
  loading: boolean
  user: UserProfile | null
}