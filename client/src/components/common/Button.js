import styled from "styled-components";

const Button = styled.button`
  box-sizing: border-box;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  background-color: ${(props) => props.backGroundColor};
  border: 0;
  border-radius: ${(props) => props.borderRad};
`;

export default Button;
