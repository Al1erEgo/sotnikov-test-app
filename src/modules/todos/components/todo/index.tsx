import React, { FC, memo, useState } from "react"
import { TodoEntityType } from "../../types"
import { TodoCard } from "./styles"
import {
  ActionsBar,
  FlexContainer,
  useActions,
  useAppSelector,
} from "../../../../common"
import { Skeleton, Switch, Tooltip } from "antd"
import { getIsTodoSelected, todosActions, todosThunks } from "../../slice"
import { TodoForm } from "../todo-form"

type TodoProps = {
  todo: TodoEntityType
}

export const Todo: FC<TodoProps> = memo(({ todo }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const isSelected = useAppSelector((state) =>
    getIsTodoSelected(state, todo.id),
  )

  const { changeTodoStatus, updateTodo } = useActions(todosThunks)
  const { changeTodoSelection } = useActions(todosActions)

  const handleFormSubmit = ({
    title,
    completed,
  }: {
    title: string
    completed: boolean
  }) => {
    if (todo.title !== title || todo.completed !== completed)
      updateTodo({
        todoId: todo.id,
        title,
        completed,
      })
    setIsEdit(false)
  }

  if (todo.isTodoLoading) {
    return (
      <TodoCard completed={todo.completed ? "completed" : ""}>
        <Skeleton paragraph={{ rows: 0 }} />
      </TodoCard>
    )
  }

  return (
    <TodoCard completed={todo.completed ? "completed" : ""}>
      <ActionsBar
        scale={0.8}
        selected={isSelected}
        onSelect={() => changeTodoSelection(todo.id)}
        onEdit={() => {
          setIsEdit((prev) => !prev)
        }}
      />
      {isEdit ? (
        <TodoForm
          title={todo.title}
          completed={todo.completed}
          onCancel={() => setIsEdit(false)}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <FlexContainer justifycontent={"space-between"} flexdirection={"row"}>
          {todo.title}
          <FlexContainer width={"20%"}>
            <Tooltip
              title={
                todo.completed
                  ? "Отметить не выполненым"
                  : "Отметить выполненым"
              }
            >
              <Switch
                checked={todo.completed}
                onChange={() =>
                  changeTodoStatus({
                    todoId: todo.id,
                    completed: !todo.completed,
                  })
                }
              />
            </Tooltip>
          </FlexContainer>
        </FlexContainer>
      )}
    </TodoCard>
  )
})
