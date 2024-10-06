import { Comment, CommentCreate } from '../interface/PostInterface'
import { apiCaller } from './apiCaller'

export const createComment = async (
  comment: CommentCreate,
  postId: string
): Promise<Comment | null> => {
  try {
    const response = await apiCaller.post<Comment>(
      `/comments/create/${postId}`,
      comment
    )
    if (response) {
      const data: Comment = response
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

export const likeComment = async (
  commentId: string
): Promise<Comment | null> => {
  try {
    const response = await apiCaller.put<Comment>(`/comments/like/${commentId}`)
    if (response) {
      const data: Comment = response
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
