import axios from 'axios'
import { Post } from '../../interface/PostInterface'
import { UserProfile } from '../../interface/UserInterface'

const baseURL = process.env.REACT_APP_BASE_API_URL

export const getAllPost = async (): Promise<Post[] | null> => {
  try {
    const response = await axios.get(`${baseURL}/posts`)
    if (response) {
      const data: Post[] = response.data
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

export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const response = await axios.get(`${baseURL}/posts/${postId}`)
    if (response) {
      const data: Post = response.data
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

export const getPostByUser = async (userId: string): Promise<Post[] | null> => {
  try {
    const response = await axios.get(`${baseURL}/posts/userPosts/${userId}`)
    if (response) {
      const data: Post[] = response.data
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

export const searchPost = async (query: string): Promise<Post[] | null> => {
  try {
    const response = await axios.get(`${baseURL}/posts/search?query=${query}`)
    if (response) {
      const data: Post[] = response.data
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
