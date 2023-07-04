import { RootState } from '@/app/store'

export const selectFavouritePostsIds = (state: RootState) => state.favourite.posts
export const selectFavouriteAlbumsIds = (state: RootState) => state.favourite.albums
