import { commonInstance } from "./common-api"
import { UserType } from "../types"

export const usersApi = {
  getUser(userId: number) {
    return commonInstance.get<UserType>(`users/${userId}`)
  },
}
