import { RootState } from './store'

export const selectAppErrorMessage = (state: RootState) => state.app.error

export const selectIsDataLoading = (state: RootState) => state.app.dataLoading
