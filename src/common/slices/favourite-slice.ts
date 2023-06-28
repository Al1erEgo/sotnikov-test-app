import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

type FavouriteState = {
  postsId: number[]
}

const initialState: FavouriteState = {
  postsId: [],
}

const changePostFav = createAsyncThunk<void, number>(
  "favourite/changePostFav",
  async (postId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(favouriteActions.changePostFav(postId))
    } catch (error) {
      console.log(error)
    }
  },
)

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    changePostFav: (state, action: PayloadAction<number>) => {
      if (!state.postsId) {
        state.postsId = [action.payload]
      }
      if (!state.postsId.find((id) => id === action.payload)) {
        state.postsId.push(action.payload)
      } else {
        state.postsId = state.postsId.filter((id) => id !== action.payload)
      }
    },
  },
})

export const favouriteReducer = favouriteSlice.reducer

export const favouriteActions = favouriteSlice.actions

export const favouriteThunks = { changePostFav }
