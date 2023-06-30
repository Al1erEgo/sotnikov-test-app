import styled from "styled-components"

export const PostsGroupActionsContainer = styled.div`
  position: sticky;
  bottom: 90px;
  z-index: 100;

  display: flex;
  justify-content: center;
  gap: 10px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`
