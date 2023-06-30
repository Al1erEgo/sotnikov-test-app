import styled from "styled-components"

export const PostsGroupActionsContainer = styled.div`
  position: absolute;
  bottom: 70px;
  z-index: 100;
  width: 95%;

  display: flex;
  justify-content: center;
  gap: 10px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`
