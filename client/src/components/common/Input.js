import styled from "styled-components";

const Input = styled.input`
  box-sizing: border-box;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: #fff;
  // box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  // color: ${(props) => (props.color ? props.color : "white")};
  font-size: ${(props) => props.fontSize};
  text-align: ${(props) => props.textAlign};
  border-radius: ${(props) => props.borderRad};
`;

export default Input;
