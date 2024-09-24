import { UserProfile } from '../interface/UserInterface'
import { apiCaller } from './ApiCaller'

export const getUserProfile = async () => {
  try {
    const response = await apiCaller.get<UserProfile>(`/users/profile`)
    const data: UserProfile = response
    console.log('Data: ', data ? data.email : 'No data returned')
    return data
  } catch (error: any) {
    console.error(
      'Error: ',
      error.response ? error.response.data : error.message
    )
  }
}
