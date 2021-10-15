import React from "react";
import Card from "../common/Card";
import Text from "../common/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OfferItem(props) {
  return (
    <Card flexDirection="column" alignItems="center" flexBasis="30%">
      <Card backGroundColor="white" height="20px" width="50px"></Card>
      <FontAwesomeIcon icon={props.icon} />
      <Text fontWeight="bold" fontSize="25px">
        {props.offerName}
      </Text>
    </Card>
  );
}
