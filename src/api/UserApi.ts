import { UserProfile, UserUpdate } from '../interface/UserInterface'
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

export const updateUserProfile = async (
  data: UserUpdate
): Promise<UserProfile | null> => {
  try {
    const response = await apiCaller.put<UserProfile>(`/users/update`, data)
    const updatedData: UserProfile = response
    return updatedData
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
    return null
  }
}

export const followUser = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    const response = await apiCaller.put<UserProfile>(`/users/follow/${userId}`)
    const updatedData: UserProfile = response
    return updatedData
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
    return null
  }
}
