import { Card } from "antd"
import styled from "styled-components"
import { NavLink } from "react-router-dom"

export const StyledAlbumCard = styled(Card)<{ favourite: string }>`
  max-width: 300px;
  width: 300px;
  max-height: fit-content;
  min-height: 130px;
  border-color: ${(props) => (props.favourite ? "#1677ff" : "#e7e7e7")};
`
export const StyledPhotoCard = styled(Card)`
  max-width: 200px;
  width: 200px;
  max-height: 250px;
  height: 250px;
`

export const AlbumCardHeaderLink = styled(NavLink)`
  font-size: 1.3em;
  color: black;
`
