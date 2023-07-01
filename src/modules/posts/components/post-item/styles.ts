import styled from "styled-components"
import { MessageOutlined } from "@ant-design/icons"
import { Card } from "antd"

export const PostCard = styled(Card)<{ favourite: string }>`
  margin: 10px 0;
  border-color: ${(props) => (props.favourite ? "#1677ff" : "#e7e7e7")};
`

export const ShowCommentsIcon = styled(MessageOutlined)<{ active: string }>`
  font-size: 1em;
  color: ${(props) => (props.active ? "#1677ff" : "gray")};
`
