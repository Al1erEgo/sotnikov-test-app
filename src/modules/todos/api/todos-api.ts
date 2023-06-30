import { commonInstance } from "../../../common"
import { AddTodoPayloadType, TodoType } from "../types"

export const todosApi = {
  getTodos() {
    return commonInstance.get<TodoType[]>("todos")
  },
  addTodo(arg: AddTodoPayloadType) {
    return commonInstance.post<TodoType>("todos", arg)
  },
  changeTodoStatus(todoId: number, completed: boolean) {
    return commonInstance.patch<TodoType>(`todos/${todoId}`, {
      completed,
    })
  },
}
