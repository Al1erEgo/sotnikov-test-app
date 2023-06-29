import { PostEntityType } from "../../modules/posts/types"
import { AlbumEntityType } from "../../modules/photos/types"

type EntitiesType = (PostEntityType | AlbumEntityType)[] | undefined

export const getFilteredByTitle = <T extends EntitiesType>(
  entities: T,
  titleFilter: string,
) => {
  return entities?.filter((entity) => entity.title.includes(titleFilter))
}

export const getFilteredByUserId = <T extends EntitiesType>(
  entities: T,
  userIdFilter: number[],
) => {
  return entities?.filter((entity) =>
    userIdFilter.find((id) => id === entity.userId),
  )
}

export const getFilteredByFavourite = <T extends EntitiesType>(
  entities: T,
  favouriteFilter: boolean,
  favouritePostIds: { [p: string]: boolean },
) => {
  return entities?.filter(
    (entity) => !!favouritePostIds[entity.id] === favouriteFilter,
  )
}
