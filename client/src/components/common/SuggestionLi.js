import styled from "styled-components";

const SuggestionsLi = styled.li`
  color: black;
  display: flex;
  width: 100%;
  justify-content: space-between;
  overflow: hidden;
  padding: 4px;
  border-bottom: 1px solid lightgreen;
  border-radius: 25px;
  &:hover {
    background-color: #83ffff;
    color: #000000;
    cursor: pointer;
    font-weight: 700;
    p {
      color: white;
    }
  }
`;

export default SuggestionsLi;
