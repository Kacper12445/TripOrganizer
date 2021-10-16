import React from "react";
import Card from "../common/Card";
import Text from "../common/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OfferItem(props) {
  return (
    <Card flexDirection="column" alignItems="center" flexBasis="30%">
      <FontAwesomeIcon
        icon={props.icon}
        style={{ color: "white", fontSize: "55px" }}
      />
      <Text fontWeight="bold" fontSize="25px" color="white">
        {props.offerName}
      </Text>
    </Card>
  );
}
