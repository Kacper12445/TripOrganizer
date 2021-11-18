import React from "react";
import Card from "../common/Card";
import Text from "../common/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OfferItem(props) {
  return (
    <Card flexDirection="column" alignItems="center" flexBasis="30%">
      <FontAwesomeIcon
        icon={props.icon}
        style={{ color: "white", fontSize: "4.7rem" }}
      />
      <Text fontWeight="bold" fontSize="2.3rem" color="white">
        {props.offerName}
      </Text>
    </Card>
  );
}
