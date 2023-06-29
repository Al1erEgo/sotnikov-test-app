import { RootState } from "./store"

export const getAppErrorMessage = (state: RootState) => state.app.error

export const getIsDataLoading = (state: RootState) => state.app.dataLoading