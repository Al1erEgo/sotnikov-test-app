import styled from "styled-components"
import Link from "antd/lib/typography/Link"
import { MessageOutlined } from "@ant-design/icons"

export const PostTitle = styled.h3`
  margin-bottom: 5px;
`

export const UserName = styled.p`
  font-size: 0.9em;
  color: darkgray;
`

export const ShowButton = styled(Link).attrs<{
  active: boolean
}>((props) => ({
  style: { color: props.active ? "gray" : "#1677ff" },
}))`
  font-size: 0.8em;
`

export const ShowComments = styled(MessageOutlined)<{ active: boolean }>`
  font-size: 1em;
  color: ${(props) => (props.active ? "#1677ff" : "gray")};
`
