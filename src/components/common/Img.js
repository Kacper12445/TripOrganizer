import styled from "styled-components";

const Img = styled.img`
  src: ${(props) => props.src};
  alt: ${(props) => props.alt};
  position: ${(props) => props.position};
  margin: ${(props) => props.margin};
  overflow: ${(props) => props.overflow};
`;
export default Img;
