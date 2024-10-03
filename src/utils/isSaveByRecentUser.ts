import { Post } from '../interface/PostInterface'
import { UserProfile } from '../interface/UserInterface'

export const isSaevByRecentUser = (
  user: UserProfile,
  postId: string
): boolean => {
  for (let s of user.saved) {
    if (s === postId) {
      return true
    }
  }
  return false
}
