import { commonInstance } from "../../../common"
import { TodoType } from "../types/todos-api-dtos"

export const todosApi = {
  getTodos() {
    return commonInstance.get<TodoType[]>("todos")
  },
}
