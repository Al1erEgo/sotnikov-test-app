import styled from "styled-components"
import { HeartFilled } from "@ant-design/icons"

export const PostActionsContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 7px;
  display: flex;
  align-items: center;
  gap: 7px;
`

export const FavouriteFilled = styled(HeartFilled)`
  color: red;
`
