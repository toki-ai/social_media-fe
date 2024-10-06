import { Comment, Post } from '../interface/PostInterface'

export const isLikeByRecentUser = (
  recentUserId: string,
  post: Post
): boolean => {
  for (let user of post.liked) {
    if (user.id === recentUserId) {
      return true
    }
  }
  return false
}

export const isLikeCommentByRecentUser = (
  recentUserId: string,
  comment: Comment
): boolean => {
  if (comment.liked != null) {
    for (let user of comment.liked) {
      if (user.id === recentUserId) {
        return true
      }
    }
    return false
  }
  return false
}
