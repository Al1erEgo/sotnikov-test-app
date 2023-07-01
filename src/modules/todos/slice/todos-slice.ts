import { AddTodoPayloadType, TodoEntityType, TodoType } from "../types"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { filtersSortActions, usersThunks } from "../../../common/slices"
import { appActions } from "../../../app/app-slice"
import { handleServerNetworkError } from "../../../common/utils"
import { todosApi } from "../api"
import { TODOS_SORT_DIRECTIONS } from "../constants"

type TodosStateType = {
  todos: TodoEntityType[]
  selectedTodos: {
    [key: string]: boolean
  }
}

const initialState: TodosStateType = {
  todos: [],
  selectedTodos: {},
}

const fetchTodos = createAsyncThunk<TodoType[], void>(
  "todos/fetchPosts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(usersThunks.fetchUsers())
      dispatch(appActions.setDataLoading(true))
      dispatch(filtersSortActions.clearFiltersAndSort())
      dispatch(
        filtersSortActions.setSorting(TODOS_SORT_DIRECTIONS.complete.desc),
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

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodoLoadingStatus: (
      state,
      action: PayloadAction<{ todoId: number; status: boolean }>,
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.todoId)
      if (todo) {
        todo.isTodoLoading = action.payload.status
      }
    },
    changeTodoSelection: (state, action: PayloadAction<number>) => {
      if (!state.selectedTodos[action.payload]) {
        state.selectedTodos[action.payload] = true
      } else {
        delete state.selectedTodos[action.payload]
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload.map((post) => ({
          ...post,
          isTodoLoading: false,
        }))
      })
      .addCase(changeTodoStatus.fulfilled, (state, action) => {
        const todoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.todoId,
        )
        if (todoIndex !== -1) {
          state.todos[todoIndex] = {
            ...state.todos[todoIndex],
            ...action.payload.todo,
          }
        }
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.todoId,
        )
        if (todoIndex !== -1) {
          state.todos[todoIndex] = {
            ...state.todos[todoIndex],
            ...action.payload.todo,
          }
        }
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push({
          ...action.payload,
          isTodoLoading: false,
        })
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        delete state.selectedTodos[action.payload]
      })
  },
})

export const todosReducer = todosSlice.reducer
export const todosActions = todosSlice.actions
export const todosThunks = {
  fetchTodos,
  changeTodoStatus,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteTodosGroup,
}
