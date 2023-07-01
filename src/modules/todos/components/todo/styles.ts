import { Card } from "antd"
import styled from "styled-components"

export const TodoCard = styled(Card)<{ completed?: string }>`
  max-width: 90%;
  width: 550px;
  color: ${(props) => (props.completed ? "darkgray" : "black")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`
