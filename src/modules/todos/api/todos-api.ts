import { commonInstance } from "../../../common"
import { TodoType } from "../types"

export const todosApi = {
  getTodos() {
    return commonInstance.get<TodoType[]>("todos")
  },
  changeTodoStatus(todoId: number, completed: boolean) {
    return commonInstance.patch<TodoType>(`todos/${todoId}`, {
      completed,
    })
  },
}
