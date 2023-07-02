import { RootState } from '../../../app/store'

export const selectFilterByTitle = (state: RootState) => state.filtersSort.filter.title

export const selectFilterByUserId = (state: RootState) => state.filtersSort.filter.userId

export const selectFilterByFavourite = (state: RootState) => state.filtersSort.filter.favourite

export const selectFilterByCompleted = (state: RootState) => state.filtersSort.filter.completed

export const selectSorting = (state: RootState) => state.filtersSort.sorting
