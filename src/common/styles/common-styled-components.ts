import styled from "styled-components"

export const AdaptiveFlexContainer = styled.div`
  position: page;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  width: 100%;

  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`
