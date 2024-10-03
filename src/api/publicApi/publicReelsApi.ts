import axios from 'axios'
import { Reels } from '../../interface/ReelsInterface'

const baseURL = process.env.REACT_APP_BASE_API_URL

export const getAllReels = async (): Promise<Reels[] | null> => {
  try {
    const response = await axios.get(`${baseURL}/reels`)
    if (response) {
      const data: Reels[] = response.data
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


export const getReelsByUser = async (userId: string): Promise<Reels[] | null> => {
  try {
    const response = await axios.get(`${baseURL}/reels/${userId}`)
    if (response) {
      const data: Reels[] = response.data
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
