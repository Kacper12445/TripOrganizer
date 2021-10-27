import styled from "styled-components";

const SuggestionsLi = styled.li`
  color: black;
  display: flex;
  width: 100%;
  justify-content: space-between;
  overflow: hidden;
  &:hover {
    background-color: #f78e8a;
    color: #000000;
    cursor: pointer;
    font-weight: 700;
  }
`;

export default SuggestionsLi;
