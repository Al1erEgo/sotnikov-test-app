import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FiltersSortSlice = {
  sorting: string | undefined
  filter: {
    title?: string
    userId?: number[]
    favourite?: boolean
    completed?: boolean
  }
}

const initialState: FiltersSortSlice = {
  sorting: undefined,
  filter: {
    title: undefined,
    userId: undefined,
    favourite: undefined,
    completed: undefined,
  },
}

const filtersSortSlice = createSlice({
  name: 'filtersSort',
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload
    },
    setFilteringByUserId: (state, action: PayloadAction<number[] | undefined>) => {
      if (action.payload !== state.filter.userId) {
        state.filter.userId = action.payload
      }
    },
    setFilteringByTitleValue: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload !== state.filter.title) {
        state.filter.title = action.payload
      }
    },
    setFilteringByFavourite: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== state.filter.favourite) {
        state.filter.favourite = action.payload
      }
    },
    setFilteringByCompleted: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== state.filter.completed) {
        state.filter.completed = action.payload
      }
    },
    clearFiltersAndSort: state => {
      state.sorting = undefined
      state.filter = {
        title: undefined,
        userId: undefined,
        favourite: undefined,
        completed: undefined,
      }
    },
  },
})

export const filtersSortReducer = filtersSortSlice.reducer
export const filtersSortActions = filtersSortSlice.actions
