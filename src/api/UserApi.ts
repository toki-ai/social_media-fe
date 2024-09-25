import { UserProfile } from '../interface/UserInterface'
import { apiCaller } from './apiCaller'

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await apiCaller.get<UserProfile>(`/users/profile`)
    const data: UserProfile = response
    return data
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
    return null
  }
}
