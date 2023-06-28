import styled from "styled-components"

export const PostsContainer = styled.div`
  max-height: calc(100% - 150px);
  min-height: 200px;
  overflow: auto;
  position: relative;

  @media screen and (max-height: 400px) {
    max-height: calc(100% - 250px);
  }

  @media screen and (max-width: 400px) {
    max-height: calc(100% - 150px);
  }
`
