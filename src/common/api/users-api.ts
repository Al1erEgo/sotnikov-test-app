import { UserType } from '../types'

import { commonInstance } from './common-instance'

export const usersApi = {
  getUsers() {
    return commonInstance.get<UserType[]>(`users`)
  },
}
