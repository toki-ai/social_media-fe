import React, { createContext, useEffect } from 'react'
import { Chat } from '../interface/ChatInterface'
import { getChatByUser } from '../api/chat'

export type ChatContextType = {
  chats: Chat[]
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
}

export const chatContext = createContext<ChatContextType>({
  chats: [],
  setChats: () => {},
})

interface ChatProviderProps {
  children: React.ReactNode
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = React.useState<Chat[]>([])
  useEffect(() => {
    try {
      getChatByUser().then((data) => {
        if (data) {
          setChats(data)
        }
      })
    } catch (err) {
      console.error(err)
    }
  }, [])
  return (
    <chatContext.Provider value={{ chats, setChats }}>
      {children}
    </chatContext.Provider>
  )
}
