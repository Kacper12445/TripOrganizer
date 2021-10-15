import React from "react";
import Card from "../../common/Card";
import Text from "../../common/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logo() {
  return (
    <Card alignItems="center" flexBasis="30%" justifyContent="flex-start">
      <Text fontSize="25px">
        <FontAwesomeIcon icon="plane" /> Trip Planner
      </Text>
    </Card>
  );
}
