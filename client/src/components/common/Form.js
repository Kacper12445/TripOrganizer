import styled from "styled-components";
// import Text from "./Text";

const Form = styled.form`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backGroundColor};
  margin: ${(props) => (props.margin ? props.margin : "0")};
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  align-content: ${(props) => props.alignContent};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-around"};
  flex-basis: ${(props) => props.flexBasis};
  flex-wrap: ${(props) => props.flexWrap};
  border-radius: ${(props) => props.borderRad};
  border-bottom-left-radius: ${(props) => props.borderBot};
  border-bottom-right-radius: ${(props) => props.borderBot};
`;

export default Form;
