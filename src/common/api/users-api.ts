import { commonInstance } from "./common-instance"
import { UserType } from "../types"

export const usersApi = {
  getUsers() {
    return commonInstance.get<UserType[]>(`users`)
  },
}
