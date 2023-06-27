import { commonInstance } from "./common-api"
import { UserType } from "../types"

export const usersApi = {
  getUsers() {
    return commonInstance.get<UserType[]>(`users`)
  },
  updateUserName(userName: string, userId: number) {
    return commonInstance.patch<UserType>(`users/${userId}`, { name: userName })
  },
}
