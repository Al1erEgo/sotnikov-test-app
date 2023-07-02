import { useEffect } from 'react'

import { selectIsDataLoading } from '../../../../app/app-selectors'
import {
  filtersSortActions,
  GroupActionsButtons,
  NoContentMessageProvider,
  Paginator,
  StyledLoader,
  useActions,
  useAppSelector,
  useModal,
  usePaginationWSearchParams,
} from '../../../../common'
import { AddTodoButtonWithModal, TodoItem, TodosFiltersPanel } from '../../components'
import { TODOS_SORTING_DIRECTIONS } from '../../constants'
import { selectSelectedTodos, selectSortedTodos, todosActions, todosThunks } from '../../slice'

import { TodosContentContainer } from './styles'

const TodosPage = () => {
  const todos = useAppSelector(selectSortedTodos)
  const selectedTodos = useAppSelector(selectSelectedTodos)
  const isLoading = useAppSelector(selectIsDataLoading)

  const { fetchTodos, deleteTodosGroup } = useActions(todosThunks)
  const { clearFiltersAndSort, setSorting } = useActions(filtersSortActions)
  const { clearSelectedTodos } = useActions(todosActions)

  const { modal: deletePostsModal, handleOpenModal: openDeleteModal } = useModal(
    'Удалить выбранные задачи?',
    () => deleteTodosGroup(Object.keys(selectedTodos))
  )

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePaginationWSearchParams(todos)

  useEffect(() => {
    setSorting(TODOS_SORTING_DIRECTIONS.desc.complete)
    if (!todos.length) {
      fetchTodos()
    }

    return () => {
      const clear = () => {
        clearFiltersAndSort()
        clearSelectedTodos()
      }

      clear()
    }
  }, [fetchTodos])

  if (isLoading) {
    return <StyledLoader />
  }

  return (
    <>
      <TodosFiltersPanel />
      <AddTodoButtonWithModal />
      <TodosContentContainer>
        <NoContentMessageProvider isContent={!!currentPageContent.length}>
          {currentPageContent.map(task => (
            <TodoItem key={task.id} todo={task} />
          ))}
        </NoContentMessageProvider>
      </TodosContentContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={todos.length}
      />
      {Object.keys(selectedTodos).length !== 0 && (
        <GroupActionsButtons onDelete={openDeleteModal} />
      )}
      {deletePostsModal}
    </>
  )
}

export default TodosPage
