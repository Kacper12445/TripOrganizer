import styled from "styled-components";
const SuggestionDiv = styled.ul`
  position: absolute;
  background-color: white;
  width: 100%;
  border-top-width: 0;
  list-style: none;
  margin-top: 100px;
  overflow: scroll;
  padding-left: 0;
  z-index: 1;
  li {
    padding: 4px;
  }
  &:active {
    background: linear-gradient(180deg, #f76e68 0%, rgba(247, 110, 104, 0) 100%),
      #f76e68;
    color: #ffffff;
    cursor: pointer;
    font-weight: 700;
  }
`;
export default SuggestionDiv;
