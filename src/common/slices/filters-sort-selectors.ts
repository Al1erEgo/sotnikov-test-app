import { RootState } from "../../app/store"

export const getFilterByTitle = (state: RootState) =>
  state.filtersSort.filter.title

export const getFilterByUserId = (state: RootState) =>
  state.filtersSort.filter.userId

export const getFilterByFavourite = (state: RootState) =>
  state.filtersSort.filter.favourite

export const getFilterByCompleted = (state: RootState) =>
  state.filtersSort.filter.completed

export const getSorting = (state: RootState) => state.filtersSort.sorting
