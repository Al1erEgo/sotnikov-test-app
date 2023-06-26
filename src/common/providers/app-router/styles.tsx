import styled from "styled-components"
import { Spin } from "antd"

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

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
