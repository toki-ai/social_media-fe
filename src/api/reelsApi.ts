import { Reels, ReelsCreate } from '../interface/ReelsInterface'
import { apiCaller } from './apiCaller'

export const createReels = async (
  reels: ReelsCreate
): Promise<Reels | null> => {
  try {
    const response = await apiCaller.post<Reels>('/reels/create', reels)
    if (response) {
      const data: Reels = response
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


