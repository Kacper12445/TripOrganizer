import styled from "styled-components";
// import Text from "./Text";

const Card = styled.div`
  box-sizing: border-box;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: ${(props) => props.position};
  // ----------Flex displaying----------
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  align-content: ${(props) => props.alignContent};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-around"};
  flex-basis: ${(props) => props.flexBasis};
  flex-wrap: ${(props) => props.flexWrap};
  flex-shrink: ${(props) => props.flexShrink}
  // ----------BACKGROUND----------
  background-image: url(${(props) => props.backGroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${(props) => props.backGroundColor};
  // ----------BORDER----------
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRad};
  border-bottom: ${(props) => props.border_bot};
  border-left: ${(props) => props.borderLeft};
  overflow: ${(props) => (props.overflow ? props.overflow : "hidden")};
  cursor: ${(props) => props.cursor};
  &.navItem:hover .navItemText {
    color: lightgreen;
  }
  &.navItem:hover {
    border-bottom: solid lightgreen 1px;
  }
`;
export default Card;
