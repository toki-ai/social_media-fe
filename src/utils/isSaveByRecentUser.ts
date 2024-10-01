import { Post } from '../interface/PostInterface'
import { UserProfile } from '../interface/UserInterface'

export const isLikeByRecentUser = (
  user: UserProfile,
  postId: string
): boolean => {
  for (let s of user.saved) {
    if (s.id === postId) {
      return true
    }
  }
  return false
}
