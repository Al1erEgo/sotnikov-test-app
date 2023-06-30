import { Card } from "antd"
import styled from "styled-components"

export const StyledAlbumCard = styled(Card)<{ favourite: string }>`
  max-width: 300px;
  width: 300px;
  max-height: 130px;
  height: 130px;
  border-color: ${(props) => (props.favourite ? "#1677ff" : "#e7e7e7")};
`
