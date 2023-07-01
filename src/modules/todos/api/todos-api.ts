import { commonInstance } from '../../../common'
import { AddTodoPayloadType, TodoType } from '../types'

export const todosApi = {
  getTodos() {
    return commonInstance.get<TodoType[]>('todos')
  },
  addTodo(arg: AddTodoPayloadType) {
    return commonInstance.post<TodoType>('todos', arg)
  },
  changeTodoStatus(todoId: number, completed: boolean) {
    return commonInstance.patch<TodoType>(`todos/${todoId}`, {
      completed,
    })
  },
  updateTodo(todoId: number, title: string, completed: boolean) {
    return commonInstance.patch<TodoType>(`todos/${todoId}`, {
      title,
      completed,
    })
  },
  deleteTodo(todoId: number) {
    return commonInstance.delete<{}>(`todos/${todoId}`)
  },
}
