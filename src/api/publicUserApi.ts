import axios from 'axios'
import { UserProfile } from '../interface/UserInterface'

const baseURL = process.env.REACT_APP_BASE_API_URL

export const searchUser = async (
  query: string
): Promise<UserProfile | null> => {
  try {
    const response = await axios.get(`${baseURL}/users/search?query=${query}`)
    if (response) {
      const data: UserProfile = response.data
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

export const getUserById = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    const response = await axios.get(`${baseURL}/users/${userId}`)
    if (response) {
      const data: UserProfile = response.data
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

export const getAllUser = async (): Promise<UserProfile[] | null> => {
  try {
    const response = await axios.get(`${baseURL}/users`)
    if (response) {
      const data: UserProfile[] = response.data
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
