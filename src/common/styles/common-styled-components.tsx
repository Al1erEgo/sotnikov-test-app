import { Spin } from 'antd'
import { styled } from 'styled-components'

export const FlexContainer = styled.div<{
  alignitems?: string
  justifycontent?: string
  flexdirection?: string
  margin?: string
  padding?: string
  width?: string
  gap?: string
}>`
  width: ${props => props.width || '100%'};
  display: flex;
  align-items: ${props => props.alignitems || 'center'};
  flex-direction: ${props => props.flexdirection || 'row'};
  justify-content: ${props => props.justifycontent || 'center'};
  margin: ${props => props.margin || '0px'};
  padding: ${props => props.padding || '0px'};
  gap: ${props => props.gap || '0px'};

  @media screen and (max-width: 500px) {
    flex-direction: ${props => props.flexdirection || 'column'};
    align-items: center;
  }
`

export const SecondaryText = styled.p`
  font-size: 0.9em;
  color: darkgray;
`

const LoaderContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledLoader = styled(() => (
  <LoaderContainer>
    <Spin />
  </LoaderContainer>
))``

export const PageContentContainer = styled.div`
  max-height: calc(100% - 50px);
  min-height: 200px;
  overflow: auto;
  position: relative;
`
