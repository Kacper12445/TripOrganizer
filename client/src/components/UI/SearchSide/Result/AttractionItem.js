import React from "react";
import Card from "../../../common/Card";
import Text from "../../../common/Text";

export default function AttractionItem(props) {
  return (
    <Card width="100%" justifyContent="flex-start">
      <Text fontSize="1.3rem" margin="0 0 0 5%">
        {props.attraction.name}
      </Text>
    </Card>
  );
}
