import styled from "styled-components"

export const PostsActionsContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 100;

  display: flex;
  gap: 10px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`
