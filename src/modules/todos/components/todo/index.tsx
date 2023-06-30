import React, { FC, memo } from "react"
import { TodoEntityType } from "../../types"
import { TodoCard } from "./styles"
import { FlexContainer, useActions } from "../../../../common"
import { Skeleton, Switch, Tooltip } from "antd"
import { todosThunks } from "../../slice"

type TodoProps = {
  todo: TodoEntityType
}

export const Todo: FC<TodoProps> = memo(({ todo }) => {
  const { changeTodoStatus } = useActions(todosThunks)

  if (todo.isTodoLoading) {
    return (
      <TodoCard completed={todo.completed ? "completed" : ""}>
        <Skeleton paragraph={{ rows: 0 }} />
      </TodoCard>
    )
  }

  return (
    <TodoCard completed={todo.completed ? "completed" : ""}>
      <FlexContainer justifycontent={"space-between"} flexdirection={"row"}>
        {todo.title}
        <Tooltip
          title={
            todo.completed ? "Отметить не выполненым" : "Отметить выполненым"
          }
        >
          <Switch
            checked={todo.completed}
            onChange={() =>
              changeTodoStatus({ todoId: todo.id, completed: !todo.completed })
            }
          />
        </Tooltip>
      </FlexContainer>
    </TodoCard>
  )
})
