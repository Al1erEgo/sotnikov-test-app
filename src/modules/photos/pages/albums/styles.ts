import styled from "styled-components"

export const AlbumsContainer = styled.div`
  max-height: calc(100% - 50px);
  //height: calc(100% - 160px);
  min-height: 200px;
  overflow: auto;
  position: relative;
  padding: 10px 0;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  //display: grid;
  //grid-template-columns: auto auto auto;
  //gap: 10px;
  //
  //@media screen and (max-width: 500px) {
  //  grid-template-columns: auto;
  //}
`
