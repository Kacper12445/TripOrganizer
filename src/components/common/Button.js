import styled from "styled-components";

const Button = styled.button`
  box-sizing: border-box;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #7f8ff4;
  border: 0;
`;

export default Button;
