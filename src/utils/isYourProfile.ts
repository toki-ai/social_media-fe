import { getUserProfile } from '../api/userApi'

export const isYourProfile = async (id: string | null): Promise<boolean> => {
  const token = localStorage.getItem('jwt')
  if (token && id) {
    try {
      const data = await getUserProfile()
      if (data && data.id === id) {
        return true
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }
  return false
}
