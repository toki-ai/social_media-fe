import axios from 'axios'
import { LoginData, RegisterData } from '../interface/UserInterface'

const apiUrl = import.meta.env.VITE_API_URL

export const signIn = async (signIn: LoginData) => {
  try {
    const { data } = await axios.post(`${apiUrl}/auth/signin`, signIn)
    if (data.token) {
      localStorage.setItem('jwt', data.token)
    }
  } catch (error) {
    console.log('Error: ', error)
  }
}

export const signUp = async (signUp: RegisterData) => {
  try {
    const { data } = await axios.post(`${apiUrl}/auth/signup`, signUp)
    if (data.token) {
      localStorage.setItem('jwt', data.token)
    }
  } catch (error) {
    console.log('Error: ', error)
  }
}
