import { useEffect } from 'react'

import {
  GroupActionsButtons,
  Paginator,
  useActions,
  useAppSelector,
  useModal,
} from '../../../../common'
import { usePaginationWSearchParams } from '../../../../common/hooks/use-pagination-w-search-params'
import { AddTodoButtonWithModal, TodoItem, TodosFiltersPanel } from '../../components'
import { getSelectedTodos, getSortedTodos, todosThunks } from '../../slice'

import { TodosContentContainer } from './styles'

const TodosPage = () => {
  const todos = useAppSelector(getSortedTodos)
  const selectedTodos = useAppSelector(getSelectedTodos)

  const { fetchTodos, deleteTodosGroup } = useActions(todosThunks)

  const { modal: deletePostsModal, handleOpenModal: openDeleteModal } = useModal(
    'Удалить выбранные задачи?',
    () => deleteTodosGroup(Object.keys(selectedTodos))
  )

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePaginationWSearchParams(todos)

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

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
