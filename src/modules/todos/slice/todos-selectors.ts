import { RootState } from "../../../app/store"
import {
  getFilterByCompleted,
  getFilterByTitle,
  getFilteredByCompleted,
  getFilteredByTitle,
  getSorting,
} from "../../../common"
import { TODOS_SORT_DIRECTIONS } from "../constants"
import { TodoEntityType } from "../types"
import { createSelector } from "@reduxjs/toolkit"

export const getTodos = (state: RootState) => state.todos.todos

export const getSelectedTodos = (state: RootState) => state.todos.selectedTodos

const selectedTodoId = (state: RootState, todoId: number) => todoId
export const getIsTodoSelected = createSelector(
  [getSelectedTodos, selectedTodoId],
  (selectedTodos, todoId) => selectedTodos[todoId],
)

export const getFilteredTodos = (state: RootState) => {
  const todos = getTodos(state)
  const titleFilter = getFilterByTitle(state)
  const completedFilter = getFilterByCompleted(state)

  let filteredTodos: TodoEntityType[] | undefined = todos

  if (titleFilter) {
    filteredTodos = getFilteredByTitle(
      filteredTodos,
      titleFilter,
    ) as TodoEntityType[]
  }

  if (completedFilter !== undefined) {
    filteredTodos = getFilteredByCompleted(
      filteredTodos,
      completedFilter,
    ) as TodoEntityType[]
  }

  return filteredTodos
}

export const getSortedTodos = (state: RootState) => {
  const todos = getFilteredTodos(state)
  const sorting = getSorting(state)

  if (!todos) {
    return []
  }

  if (!sorting) {
    return todos
  }

  if (sorting === TODOS_SORT_DIRECTIONS.asc.complete) {
    return [...todos].sort((a) => (a.completed ? -1 : 1))
  }

  if (sorting === TODOS_SORT_DIRECTIONS.desc.complete) {
    return [...todos].sort((a) => (a.completed ? 1 : -1))
  }

  if (sorting === TODOS_SORT_DIRECTIONS.asc.title) {
    return [...todos].sort((a, b) => (a.title > b.title ? 1 : -1))
  }
  if (sorting === TODOS_SORT_DIRECTIONS.desc.title) {
    return [...todos].sort((a, b) => (a.title > b.title ? -1 : 1))
  }

  return todos
}
