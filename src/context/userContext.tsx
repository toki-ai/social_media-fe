import { createContext, ReactNode, useEffect, useState } from 'react'
import { UserProfile } from '../interface/UserInterface'
import { getUserProfile } from '../api/userApi'

export interface UserContextType {
  user: UserProfile | null
}

export const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      getUserProfile().then((data) => {
        if (data) {
          setUser(data)
        }
      })
    }
  }, [])
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
