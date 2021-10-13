import styled from "styled-components";

const Card = styled.div`
  box-sizing: border-box;
  margin: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-around"};
`;

export default Card;
