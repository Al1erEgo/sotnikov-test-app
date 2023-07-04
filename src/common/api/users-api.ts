import { UserType } from '../types'

import { commonInstance } from '@/common'

export const usersApi = {
  getUsers() {
    return commonInstance.get<UserType[]>(`users`)
  },
}
