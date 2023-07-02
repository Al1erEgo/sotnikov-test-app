import { useEffect } from 'react'

import { Typography } from 'antd'

import { selectIsDataLoading } from '../../../../app/app-selectors'
import {
  filtersSortActions,
  FlexContainer,
  GroupActionsButtons,
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

  if (!todos?.length) {
    return (
      <FlexContainer>
        <Typography.Text>Нечего отобразить :(</Typography.Text>
      </FlexContainer>
    )
  }

  return (
    <>
      <TodosFiltersPanel />
      <AddTodoButtonWithModal />
      <TodosContentContainer>
        {currentPageContent.map(task => (
          <TodoItem key={task.id} todo={task} />
        ))}
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
