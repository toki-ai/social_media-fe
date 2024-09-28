import { UserProfile } from '../interface/UserInterface'

export const getResUser = (userList: UserProfile[], reqUser: UserProfile) => {
  return userList.filter((user) => user.id != reqUser.id)[0]
}
