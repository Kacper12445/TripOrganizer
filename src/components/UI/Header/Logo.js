import React from "react";
import Card from "../../common/Card";
import Text from "../../common/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logo(props) {
  return (
    <Card alignItems="center" flexBasis="30%">
      <Text
        fontSize={props.logoFZ}
        letterSpace={props.logoLetterSpacing}
        cursor="pointer"
        color="white"
      >
        <FontAwesomeIcon icon="plane" /> Trip Planner
      </Text>
    </Card>
  );
}
