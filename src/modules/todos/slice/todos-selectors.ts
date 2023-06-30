import { RootState } from "../../../app/store"
import { getSorting } from "../../../common/slices"
import { TODOS_SORT_DIRECTIONS } from "../constants"

export const getTodos = (state: RootState) => state.todos.todos

export const getSortedTodos = (state: RootState) => {
  const todos = getTodos(state)
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

  return todos
}
