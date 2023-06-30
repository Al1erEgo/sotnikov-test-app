import { TodoType } from "../types/todos-api-dtos"
import { createSlice } from "@reduxjs/toolkit"

type TodosStateType = {
  todos: TodoType[]
  selectedTodos: {
    [key: string]: boolean
  }
}

const initialState: TodosStateType = {
  todos: [],
  selectedTodos: {},
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
})

export const todosReducer = todosSlice.reducer
export const todosActions = todosSlice.actions
export const todosThunks = {}
