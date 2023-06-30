import React, { FC, memo } from "react"
import { TodoEntityType } from "../../types"
import { TaskCard } from "./styles"
import Checkbox from "antd/lib/checkbox/Checkbox"
import { FlexContainer, useActions } from "../../../../common"
import { Skeleton, Tooltip } from "antd"
import { todosThunks } from "../../slice"

type TodoProps = {
  todo: TodoEntityType
}

export const Todo: FC<TodoProps> = memo(({ todo }) => {
  const { changeTodoStatus } = useActions(todosThunks)

  if (todo.isTodoLoading) {
    return (
      <TaskCard completed={todo.completed ? "completed" : ""}>
        <Skeleton paragraph={{ rows: 0 }} />
      </TaskCard>
    )
  }

  return (
    <TaskCard completed={todo.completed ? "completed" : ""}>
      <FlexContainer justifycontent={"space-between"} flexdirection={"row"}>
        {todo.title}
        <Tooltip
          title={
            todo.completed ? "Отметить не выполненым" : "Отметить выполненым"
          }
        >
          <Checkbox
            checked={todo.completed}
            onChange={() =>
              changeTodoStatus({ todoId: todo.id, completed: !todo.completed })
            }
          />
        </Tooltip>
      </FlexContainer>
    </TaskCard>
  )
})
