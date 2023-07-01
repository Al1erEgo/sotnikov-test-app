import { TodoType } from './todos-api-dtos'

export type TodoEntityType = TodoType & {
  isTodoLoading: boolean
}
