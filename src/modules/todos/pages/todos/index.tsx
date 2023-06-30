import React, { useEffect } from "react"
import { Paginator, useActions, useAppSelector } from "../../../../common"
import { getTodos, todosThunks } from "../../slice"
import { usePaginationWSearchParams } from "../../../../common/hooks/use-pagination-w-search-params"
import { TodosContentContainer } from "./styles"
import { Todo } from "../../components/todo"

const TodosPage = () => {
  const todos = useAppSelector(getTodos)

  const { fetchTodos } = useActions(todosThunks)

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePaginationWSearchParams(todos)

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <>
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
