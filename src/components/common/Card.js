import styled from "styled-components";

const Card = styled.div`
  box-sizing: border-box;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  align-content: ${(props) => props.alignContent};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-around"};
  flex-basis: ${(props) => props.flexBasis};
  flex-wrap: ${(props) => props.flexWrap};
  background-image: url("${(props) => props.backGroundImg}");
  background-size: cover;
  background-repeat: no-repeat;
  // background-position: center
  background-color: ${(props) => props.backGroundColor};
  overflow: ${(props) => (props.overflow ? props.overflow : "hidden")};
  cursor: ${(props) => props.cursor};
`;
export default Card;
