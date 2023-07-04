import { createAsyncThunk } from '@reduxjs/toolkit'

import { todosApi } from '../api'
import { AddTodoPayloadType, TodoType } from '../types'

import { todosActions } from './todos-slice'

import { appActions } from '@/app/app-slice'
import { usersThunks } from '@/common'

const fetchTodos = createAsyncThunk<TodoType[], void>(
  'todos/fetchPosts',
  async (_, { dispatch }) => {
    try {
      dispatch(usersThunks.fetchUsers())
      dispatch(appActions.setDataLoading(true))
      const todos = await todosApi.getTodos()

      return todos.data
    } finally {
      dispatch(appActions.setDataLoading(false))
    }
  }
)

const changeTodoStatus = createAsyncThunk<
  { todo: TodoType; todoId: number },
  {
    todoId: number
    completed: boolean
  }
>('todos/changeTodoStatus', async ({ todoId, completed }, { dispatch }) => {
  try {
    dispatch(todosActions.setTodoLoadingStatus({ todoId, status: true }))
    const todo = await todosApi.changeTodoStatus(todoId, completed)

    return { todo: todo.data, todoId }
  } finally {
    dispatch(
      todosActions.setTodoLoadingStatus({
        todoId,
        status: false,
      })
    )
  }
})

const updateTodo = createAsyncThunk<
  { todo: TodoType; todoId: number },
  {
    todoId: number
    title: string
    completed: boolean
  }
>('todos/updateTodo', async ({ todoId, title, completed }, { dispatch }) => {
  try {
    dispatch(todosActions.setTodoLoadingStatus({ todoId, status: true }))
    const todo = await todosApi.updateTodo(todoId, title, completed)

    return { todo: todo.data, todoId }
  } finally {
    dispatch(
      todosActions.setTodoLoadingStatus({
        todoId,
        status: false,
      })
    )
  }
})

const addTodo = createAsyncThunk<TodoType, AddTodoPayloadType>(
  'todos/addTodo',
  async ({ title, completed }) => {
    const newTodo = await todosApi.addTodo({ title, completed })

    return newTodo.data
  }
)

const deleteTodo = createAsyncThunk<number, number>(
  'todos/deleteTodo',
  async (todoId, { dispatch }) => {
    dispatch(todosActions.setTodoLoadingStatus({ todoId, status: true }))
    await todosApi.deleteTodo(todoId)

    return todoId
  }
)

const deleteTodosGroup = createAsyncThunk<void, string[]>(
  'todos/deleteTodosGroup',
  async (todos, { dispatch }) => {
    try {
      todos.forEach(id => dispatch(todosThunks.deleteTodo(+id)))
    } finally {
      todosActions.clearSelectedTodos()
    }
  }
)

export const todosThunks = {
  fetchTodos,
  changeTodoStatus,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteTodosGroup,
}
