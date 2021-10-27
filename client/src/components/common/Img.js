import styled from "styled-components";

const Img = styled.img`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  src: ${(props) => props.src};
  alt: ${(props) => props.alt};
  position: ${(props) => props.position};
  margin: ${(props) => props.margin};
  overflow: ${(props) => props.overflow};
  border: ${(props) => props.border};
`;
export default Img;
