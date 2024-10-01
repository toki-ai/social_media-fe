import { Box, Divider, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import MiniSideBar from '../../components/Sidebar/MiniSidebar'
import SearchUser from '../../components/Search/SearchUser'
import { UserProfile } from '../../interface/UserInterface'
import { chatContext, ChatContextType } from '../../context/chatContext'
import { Chat } from '../../interface/ChatInterface'
import { createChat } from '../../api/chat'
import { getResUser } from '../../utils/getResUser'
import { UserContext, UserContextType } from '../../context/userContext'
import UserChatCard from '../../components/UserChatCard/UserChatCard'

interface UserListProps {
  setCurrentChat: (chat: Chat) => void
  currentChat: Chat | null
}

const UserList: React.FC<UserListProps> = ({ setCurrentChat, currentChat }) => {
  const chatContextValue = useContext(chatContext) as ChatContextType
  const { user }: { user: UserProfile | null } = useContext(
    UserContext
  ) as UserContextType

  const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(
    null
  )
  const handleUserSelect = (user: UserProfile) => {
    setSelectedUser(user)
  }

  useEffect(() => {
    if (selectedUser) {
      const chat = chatContextValue.chats.find((chat: Chat) =>
        chat.users.find((user: UserProfile) => user.id === selectedUser.id)
      )
      if (chat) {
        setCurrentChat(chat)
        setSelectedUser(null)
      } else {
        createChat(selectedUser.id).then((data) => {
          if (data) {
            const updatedChats: Chat[] = [...chatContextValue.chats, data]
            console.log('Before update:', chatContextValue.chats)
            chatContextValue.setChats(updatedChats)
            console.log('After update:', updatedChats)
          } else {
            console.log('Failed to create chat')
          }
        })
        setSelectedUser(null)
      }
    }
  }, [selectedUser])

  const handleChooseCurrentChat = (chat: Chat) => {
    setCurrentChat(chat)
  }

  return (
    <Grid item container lg={12}>
      <Grid item lg={1.5} sx={{ position: 'relative' }}>
        <MiniSideBar />
      </Grid>
      <Grid item lg={10.5}>
        <Box
          sx={{
            borderRight: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h6' sx={{ ml: 2 }}>
              {'@' +
                user?.firstName.toLocaleLowerCase() +
                '_' +
                user?.lastName.toLocaleLowerCase()}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <SearchUser onUserSelect={handleUserSelect} />
            <Box>
              {chatContextValue?.chats.map((chat: Chat) => {
                if (user) {
                  const resUser = getResUser(chat.users, user)
                  return (
                    <Box
                      key={chat.id}
                      onClick={() => handleChooseCurrentChat(chat)}
                    >
                      <UserChatCard
                        user={resUser}
                        isCurrentChat={
                          currentChat ? currentChat.id === chat.id : false
                        }
                      />
                    </Box>
                  )
                }
              })}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default UserList
