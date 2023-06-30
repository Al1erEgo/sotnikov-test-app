import styled from "styled-components"
import { HeartFilled } from "@ant-design/icons"

export const ActionsContainer = styled.div<{ scale: number | undefined }>`
  position: absolute;
  top: 5px;
  right: 7px;
  display: flex;
  align-items: center;
  gap: 7px;
  scale: ${(props) => props.scale || 1};
`

export const FavouriteFilled = styled(HeartFilled)`
  color: red;
`
