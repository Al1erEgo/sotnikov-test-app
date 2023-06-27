import styled from "styled-components"
import { MessageOutlined } from "@ant-design/icons"

export const ShowComments = styled(MessageOutlined)<{ active: string }>`
  font-size: 1em;
  color: ${(props) => (props.active ? "#1677ff" : "gray")};
`
