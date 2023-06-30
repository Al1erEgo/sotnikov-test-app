import React, { useEffect } from "react"
import {
  PageContentContainer,
  Paginator,
  useActions,
  useAppSelector,
} from "../../../../common"
import { getTodos, todosThunks } from "../../slice"
import { usePaginationWSearchParams } from "../../../../common/hooks/use-pagination-w-search-params"

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
      <PageContentContainer>
        {currentPageContent.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </PageContentContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={todos.length}
      />
    </>
  )
}

export default TodosPage
