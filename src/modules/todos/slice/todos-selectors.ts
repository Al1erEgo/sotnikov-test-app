import { RootState } from "../../../app/store"
import {
  getFilterByCompleted,
  getFilterByTitle,
  getSorting,
} from "../../../common/slices"
import { TODOS_SORT_DIRECTIONS } from "../constants"
import { TodoEntityType } from "../types"
import {
  getFilteredByCompleted,
  getFilteredByTitle,
} from "../../../common/utils"

export const getTodos = (state: RootState) => state.todos.todos

export const getSelectedTodos = (state: RootState) => state.todos.selectedTodos

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

  if (sorting === TODOS_SORT_DIRECTIONS.complete.asc) {
    return [...todos].sort((a) => (a.completed ? -1 : 1))
  }

  if (sorting === TODOS_SORT_DIRECTIONS.complete.desc) {
    return [...todos].sort((a) => (a.completed ? 1 : -1))
  }

  if (sorting === TODOS_SORT_DIRECTIONS.title.asc) {
    return [...todos].sort((a, b) => (a.title > b.title ? 1 : -1))
  }
  if (sorting === TODOS_SORT_DIRECTIONS.title.desc) {
    return [...todos].sort((a, b) => (a.title > b.title ? -1 : 1))
  }

  return todos
}
