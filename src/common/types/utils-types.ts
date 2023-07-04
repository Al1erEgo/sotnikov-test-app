import { AlbumEntityType } from '@/modules/photos/types'
import { PostEntityType } from '@/modules/posts/types'
import { TodoEntityType } from '@/modules/todos/types'

export type EntitiesType = (PostEntityType | AlbumEntityType | TodoEntityType)[] | undefined
