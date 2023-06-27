import styled from "styled-components"

export const FlexContainer = styled.div<{
  alignItems?: string
  justifyContent?: string
  flexDirection?: string
  margin?: string
  padding?: string
  width?: string
  gap?: string
}>`
  width: ${(props) => props.width || "100%"};
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  flex-direction: ${(props) => props.flexDirection || "row"};
  justify-content: ${(props) => props.justifyContent || "center"};
  margin: ${(props) => props.margin || "0px"};
  padding: ${(props) => props.padding || "0px"};
  gap: ${(props) => props.gap || "0px"};

  @media screen and (max-width: 400px) {
    flex-direction: ${(props) => props.flexDirection || "column"};
  }
`
