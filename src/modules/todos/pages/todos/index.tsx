import React, { useEffect } from "react"
import { Paginator, useActions, useAppSelector } from "../../../../common"
import { getSortedTodos, todosThunks } from "../../slice"
import { usePaginationWSearchParams } from "../../../../common/hooks/use-pagination-w-search-params"
import { TodosContentContainer } from "./styles"
import { AddTodoWithModal, Todo } from "../../components"

const TodosPage = () => {
  const todos = useAppSelector(getSortedTodos)

  const { fetchTodos } = useActions(todosThunks)

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePaginationWSearchParams(todos)

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <>
      <AddTodoWithModal />
      <TodosContentContainer>
        {currentPageContent.map((task) => (
          <Todo key={task.id} todo={task} />
        ))}
      </TodosContentContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={todos.length}
      />
    </>
  )
}

export default TodosPage
