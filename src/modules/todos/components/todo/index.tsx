import React, { FC } from "react"
import { TodoEntityType } from "../../types"
import { TaskCard } from "./styles"
import Checkbox from "antd/lib/checkbox/Checkbox"
import { FlexContainer } from "../../../../common"

type TodoProps = {
  todo: TodoEntityType
}

export const Todo: FC<TodoProps> = ({ todo }) => {
  return (
    <TaskCard completed={todo.completed ? "completed" : ""}>
      <FlexContainer justifycontent={"space-between"} flexdirection={"row"}>
        {todo.title}
        <Checkbox checked={todo.completed} />
      </FlexContainer>
    </TaskCard>
  )
}
