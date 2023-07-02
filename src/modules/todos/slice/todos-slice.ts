import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TodoEntityType } from '../types'

import { todosThunks } from './todos-thunks'

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

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodoLoadingStatus: (state, action: PayloadAction<{ todoId: number; status: boolean }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId)

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
    clearSelectedTodos: state => {
      state.selectedTodos = {}
    },
  },

  extraReducers: builder => {
    builder
      .addCase(todosThunks.fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload.map(post => ({
          ...post,
          isTodoLoading: false,
        }))
      })
      .addCase(todosThunks.changeTodoStatus.fulfilled, (state, action) => {
        const todoIndex = state.todos.findIndex(todo => todo.id === action.payload.todoId)

        if (todoIndex !== -1) {
          state.todos[todoIndex] = {
            ...state.todos[todoIndex],
            ...action.payload.todo,
          }
        }
      })
      .addCase(todosThunks.updateTodo.fulfilled, (state, action) => {
        const todoIndex = state.todos.findIndex(todo => todo.id === action.payload.todoId)

        if (todoIndex !== -1) {
          state.todos[todoIndex] = {
            ...state.todos[todoIndex],
            ...action.payload.todo,
          }
        }
      })
      .addCase(todosThunks.addTodo.fulfilled, (state, action) => {
        state.todos.push({
          ...action.payload,
          isTodoLoading: false,
        })
      })
      .addCase(todosThunks.deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload)
        delete state.selectedTodos[action.payload]
      })
  },
})

export const todosReducer = todosSlice.reducer
export const todosActions = todosSlice.actions
