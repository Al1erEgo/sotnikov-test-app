import styled from "styled-components"
import { MessageOutlined } from "@ant-design/icons"
import { Card } from "antd"

export const PostCard = styled(Card)<{ favourite: string }>`
  border-color: ${(props) => (props.favourite ? "#1677ff" : "#e7e7e7")};
`

export const ShowComments = styled(MessageOutlined)<{ active: string }>`
  font-size: 1em;
  color: ${(props) => (props.active ? "#1677ff" : "gray")};
`
