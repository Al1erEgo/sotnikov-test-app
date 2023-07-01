import { AlbumEntityType } from '../../modules/photos/types'
import { PostEntityType } from '../../modules/posts/types'
import { TodoEntityType } from '../../modules/todos/types'

type EntitiesType = (PostEntityType | AlbumEntityType | TodoEntityType)[] | undefined

export const getFilteredByTitle = <T extends EntitiesType>(entities: T, titleFilter: string) => {
  return entities?.filter(entity => entity.title.includes(titleFilter))
}

export const getFilteredByUserId = <T extends EntitiesType>(
  entities: T,
  userIdFilter: number[]
) => {
  return entities?.filter(entity => userIdFilter.find(id => id === entity.userId))
}

export const getFilteredByFavourite = <T extends EntitiesType>(
  entities: T,
  favouriteFilter: boolean,
  favouriteIds: { [p: string]: boolean }
) => {
  return entities?.filter(entity => !!favouriteIds[entity.id] === favouriteFilter)
}

//TODO убрать в свой модуль?
export const getFilteredByCompleted = (entities: TodoEntityType[], favouriteFilter: boolean) => {
  return entities?.filter(entity => entity.completed === favouriteFilter)
}
