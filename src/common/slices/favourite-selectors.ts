import { RootState } from "../../app/store"

export const getFavouritePosts = (state: RootState) => state.favorite.posts
export const getFavouriteAlbums = (state: RootState) => state.favorite.albums
