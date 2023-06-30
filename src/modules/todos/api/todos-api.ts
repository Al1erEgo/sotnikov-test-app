import { commonInstance } from "../../../common"
import { TodoType } from "../types"

export const todosApi = {
  getTodos() {
    return commonInstance.get<TodoType[]>("todos")
  },
}
