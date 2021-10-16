import React from "react";
import Card from "../../common/Card";
import Text from "../../common/Text";
import Img from "../../common/Img";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImg from "../../../assets/travel-logo.png";

export default function Logo(props) {
  return (
    <Card alignItems="center" flexBasis="30%" justifyContent="center">
      <Img
        src={logoImg}
        width={props.logoSize}
        height={props.logoSize}
        margin="0 2% 0 0"
      />
      <Text
        fontSize={props.logoFZ}
        letterSpace={props.logoLetterSpacing}
        cursor="pointer"
        color="white"
        lineHeight="30px"
        height="30px"
      >
        {/* <FontAwesomeIcon icon="plane" /> */}
        Trip Planner
      </Text>
    </Card>
  );
}
