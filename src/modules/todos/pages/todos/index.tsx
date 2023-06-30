import { useEffect } from "react"
import { useActions, useAppSelector } from "../../../../common"
import { getTodos, todosThunks } from "../../slice"
import { filtersSortActions } from "../../../../common/slices"

const TodosPage = () => {
  const todos = useAppSelector(getTodos)

  const { fetchTodos } = useActions(todosThunks)
  const { clearFiltersAndSort } = useActions(filtersSortActions)

  useEffect(() => {
    fetchTodos()
    clearFiltersAndSort()
  }, [fetchTodos, clearFiltersAndSort])

  return (
    <div>
      {todos.map((todo) => (
        <div>{todo.title}</div>
      ))}
    </div>
  )
}

export default TodosPage
