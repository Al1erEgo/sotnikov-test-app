import { createAsyncThunk } from "@reduxjs/toolkit"
import { AddTodoPayloadType, TodoType } from "../types"
import {
  filtersSortActions,
  handleServerNetworkError,
  usersThunks,
} from "../../../common"
import { appActions } from "../../../app/app-slice"
import { TODOS_SORT_DIRECTIONS } from "../constants"
import { todosApi } from "../api"
import { todosActions } from "./todos-slice"

const fetchTodos = createAsyncThunk<TodoType[], void>(
  "todos/fetchPosts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(usersThunks.fetchUsers())
      dispatch(appActions.setDataLoading(true))
      dispatch(filtersSortActions.clearFiltersAndSort())
      dispatch(
        filtersSortActions.setSorting(TODOS_SORT_DIRECTIONS.desc.complete),
      )
      const todos = await todosApi.getTodos()
      return todos.data
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setDataLoading(false))
    }
  },
)

const changeTodoStatus = createAsyncThunk<
  { todo: TodoType; todoId: number },
  {
    todoId: number
    completed: boolean
  }
>(
  "todos/changeTodoStatus",
  async ({ todoId, completed }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(todosActions.setTodoLoadingStatus({ todoId, status: true }))
      const todo = await todosApi.changeTodoStatus(todoId, completed)
      return { todo: todo.data, todoId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(
        todosActions.setTodoLoadingStatus({
          todoId,
          status: false,
        }),
      )
    }
  },
)

const updateTodo = createAsyncThunk<
  { todo: TodoType; todoId: number },
  {
    todoId: number
    title: string
    completed: boolean
  }
>(
  "todos/updateTodo",
  async ({ todoId, title, completed }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(todosActions.setTodoLoadingStatus({ todoId, status: true }))
      const todo = await todosApi.updateTodo(todoId, title, completed)
      return { todo: todo.data, todoId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(
        todosActions.setTodoLoadingStatus({
          todoId,
          status: false,
        }),
      )
    }
  },
)

const addTodo = createAsyncThunk<TodoType, AddTodoPayloadType>(
  "todos/addTodo",
  async ({ title, completed }, { dispatch, rejectWithValue }) => {
    try {
      const newTodo = await todosApi.addTodo({ title, completed })
      return newTodo.data
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const deleteTodo = createAsyncThunk<number, number>(
  "todos/deleteTodo",
  async (todoId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(todosActions.setTodoLoadingStatus({ todoId, status: true }))
      await todosApi.deleteTodo(todoId)
      return todoId
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const deleteTodosGroup = createAsyncThunk<void, string[]>(
  "todos/deleteTodosGroup",
  async (todos, { dispatch, rejectWithValue }) => {
    try {
      todos.forEach((id) => dispatch(todosThunks.deleteTodo(+id)))
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const todosThunks = {
  fetchTodos,
  changeTodoStatus,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteTodosGroup,
}
