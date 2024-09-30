import { Message, MessageCreate } from '../interface/ChatInterface'
import { apiCaller } from './apiCaller'

export const createMessage = async (
  message: MessageCreate,
  chatId: string,
  sendMessageToServer: (message: Message) => void
): Promise<Message | null> => {
  try {
    const response = await apiCaller.post<Message>(
      `/messages/create/${chatId}`,
      message
    )
    if (response) {
      const data: Message = response
      sendMessageToServer(data)
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

export const getMessageByChat = async (
  chatId: string
): Promise<Message[] | null> => {
  try {
    const response = await apiCaller.get<Message[]>(`/messages/${chatId}`)
    if (response) {
      const data: Message[] = response
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
