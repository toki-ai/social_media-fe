import { Post, PostCreate } from '../interface/PostInterface'
import { apiCaller } from './apiCaller'

export const createPost = async (post: PostCreate): Promise<Post | null> => {
  try {
    const response = await apiCaller.post<Post>('/posts/create', post)
    if (response) {
      const data: Post = response
      return data
    }
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
  }
  return null
}

export const updatePost = async (
  postId: string,
  post: PostCreate
): Promise<Post | null> => {
  try {
    const response = await apiCaller.put<Post>(`/posts/${postId}`, post)
    if (response) {
      const data: Post = response
      return data
    }
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
  }
  return null
}

export const likePost = async (postId: string): Promise<Post | null> => {
  try {
    const response = await apiCaller.put<Post>(`/posts/${postId}/like`)
    if (response) {
      const data: Post = response
      return data
    }
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
  }
  return null
}

export const savePost = async (postId: string): Promise<Post | null> => {
  try {
    const response = await apiCaller.put<Post>(`/posts/${postId}/save`)
    if (response) {
      const data: Post = response
      return data
    }
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
  }
  return null
}

export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    const response = await apiCaller.delete(`/posts/${postId}/delete`)
    if (response) {
      return true
    }
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
  }
  return false
}
