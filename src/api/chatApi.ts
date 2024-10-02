import { Chat } from '../interface/ChatInterface'
import { apiCaller } from './apiCaller'

export const createChat = async (
  resUserId: string | null
): Promise<Chat | null> => {
  try {
    if (resUserId) {
      const body = {
        resUserId: resUserId,
      }
      const response = await apiCaller.post<Chat>('/chats/create', body)
      return response
    } else {
      console.log('Error: No data')
      return null
    }
  } catch (err) {
    console.log('Error: ' + err)
    return null
  }
}

export const getChatByUser = async (): Promise<Chat[] | null> => {
  try {
    const response = await apiCaller.get<Chat[]>('/chats/userChats')
    return response
  } catch (err) {
    console.log('Error: ' + err)
    return null
  }
}

export const getChatByTwoUser = async (
  resUserId: string
): Promise<Chat | null> => {
  try {
    const response = await apiCaller.get<Chat>(`/chats/userChats/${resUserId}`)
    return response
  } catch (err) {
    console.log('Error: ' + err)
    return null
  }
}
