import { createSelector } from '@reduxjs/toolkit'

import { TODOS_SORTING_DIRECTIONS } from '../constants'
import { TodoEntityType } from '../types'

import { RootState } from '@/app/store'
import {
  getFilteredByCompleted,
  getFilteredByTitle,
  selectFilterByCompleted,
  selectFilterByTitle,
  selectSorting,
} from '@/common'

const selectId = (state: RootState, id: number) => id

export const selectTodos = (state: RootState) => state.todos.todos

export const selectSelectedTodos = (state: RootState) => state.todos.selectedTodos

export const selectIsTodoSelected = createSelector(
  [selectSelectedTodos, selectId],
  (selectedTodos, todoId) => selectedTodos[todoId]
)

const selectFilteredTodos = (state: RootState) => {
  const todos = selectTodos(state)
  const titleFilter = selectFilterByTitle(state)
  const completedFilter = selectFilterByCompleted(state)

  let filteredTodos: TodoEntityType[] | undefined = todos

  if (titleFilter) {
    filteredTodos = getFilteredByTitle(filteredTodos, titleFilter) as TodoEntityType[]
  }

  if (completedFilter !== undefined) {
    filteredTodos = getFilteredByCompleted(filteredTodos, completedFilter) as TodoEntityType[]
  }

  return filteredTodos
}

export const selectSortedTodos = createSelector(
  [selectFilteredTodos, selectSorting],
  (todos, sorting) => {
    if (!todos) {
      return []
    }

    if (!sorting) {
      return todos
    }

    if (sorting === TODOS_SORTING_DIRECTIONS.asc.complete) {
      return [...todos].sort(a => (a.completed ? -1 : 1))
    }

    if (sorting === TODOS_SORTING_DIRECTIONS.desc.complete) {
      return [...todos].sort(a => (a.completed ? 1 : -1))
    }

    if (sorting === TODOS_SORTING_DIRECTIONS.asc.title) {
      return [...todos].sort((a, b) => (a.title > b.title ? 1 : -1))
    }
    if (sorting === TODOS_SORTING_DIRECTIONS.desc.title) {
      return [...todos].sort((a, b) => (a.title > b.title ? -1 : 1))
    }

    return todos
  }
)
