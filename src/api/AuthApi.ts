import axios from 'axios'
import { LoginData, RegisterData } from '../interface/UserInterface'

const apiUrl = process.env.REACT_APP_BASE_API_URL

export const signIn = async (signInData: LoginData): Promise<void> => {
  try {
    const { data } = await axios.post<{ token?: string }>(
      `${apiUrl}/auth/signin`,
      signInData
    )
    if (data.token) {
      localStorage.setItem('jwt', data.token)
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error: ', error.response?.data || error.message)
    } else {
      console.error('Error: ', error)
    }
  }
}

export const signUp = async (signUpData: RegisterData): Promise<void> => {
  try {
    const { data } = await axios.post<{ token?: string }>(
      `${apiUrl}/auth/signup`,
      signUpData
    )
    if (data.token) {
      localStorage.setItem('jwt', data.token)
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error: ', error.response?.data || error.message)
    } else {
      console.error('Error: ', error)
    }
  }
}
