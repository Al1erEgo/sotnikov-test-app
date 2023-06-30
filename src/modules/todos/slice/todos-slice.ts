import { TodoEntityType, TodoType } from "../types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { filtersSortActions, usersThunks } from "../../../common/slices"
import { appActions } from "../../../app/app-slice"
import { handleServerNetworkError } from "../../../common/utils"
import { todosApi } from "../api"

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
      dispatch(filtersSortActions.setSorting("complete desc"))
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

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload.map((post) => ({
        ...post,
        isTodoLoading: false,
      }))
    })
  },
})

export const todosReducer = todosSlice.reducer
export const todosActions = todosSlice.actions
export const todosThunks = { fetchTodos }
