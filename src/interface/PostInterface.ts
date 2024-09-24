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
  user: string
  date: string
  comments: Comment[]
  liked: string[]
}
