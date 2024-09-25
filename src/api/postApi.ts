import { Post } from '../interface/PostInterface'
import { apiCaller } from './ApiCaller'

export const getPostByUser = async (): Promise<Post[] | null> => {
  try {
    const response = await apiCaller.get<Post[]>('/posts/userPosts')
    if (response) {
      const data: Post[] = response
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
