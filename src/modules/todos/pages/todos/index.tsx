import { useEffect } from 'react'

import {
  filtersSortActions,
  GroupActionsButtons,
  Paginator,
  useActions,
  useAppSelector,
  useModal,
  usePaginationWSearchParams,
} from '../../../../common'
import { AddTodoButtonWithModal, TodoItem, TodosFiltersPanel } from '../../components'
import { selectSelectedTodos, selectSortedTodos, todosThunks } from '../../slice'

import { TodosContentContainer } from './styles'

const TodosPage = () => {
  const todos = useAppSelector(selectSortedTodos)
  const selectedTodos = useAppSelector(selectSelectedTodos)

  const { fetchTodos, deleteTodosGroup } = useActions(todosThunks)
  const { clearFiltersAndSort } = useActions(filtersSortActions)

  const { modal: deletePostsModal, handleOpenModal: openDeleteModal } = useModal(
    'Удалить выбранные задачи?',
    () => deleteTodosGroup(Object.keys(selectedTodos))
  )

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePaginationWSearchParams(todos)

  useEffect(() => {
    if (!todos.length) {
      fetchTodos()
    }

    return () => {
      const clear = () => clearFiltersAndSort()

      clear()
    }
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
