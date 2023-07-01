import { RootState } from '../../../app/store'

export const getFavouritePosts = (state: RootState) => state.favourite.posts
export const getFavouriteAlbums = (state: RootState) => state.favourite.albums
