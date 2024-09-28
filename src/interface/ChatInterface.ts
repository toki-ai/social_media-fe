import { UserProfile } from './UserInterface'

export interface Chat {
  id: string
  chatName: string
  chatImage: string
  users: UserProfile[]
  timeStamps: string
  messages: Message[]
}

export interface MessageCreate {
  content: string
  image: string
}

export interface Message {
  id: string
  content: string
  image: string
  sender: UserProfile
  timeStamps: string
}
