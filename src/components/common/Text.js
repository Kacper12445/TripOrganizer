import styled from "styled-components";

const Text = styled.p`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  text-align: ${(props) => props.textAlign};
  cursor: ${(props) => props.cursor};
  letter-spacing: ${(props) => props.letterSpace};
  line-height: ${(props) => props.lineHeight};
  height: ${(props) => props.height};
`;
export default Text;
