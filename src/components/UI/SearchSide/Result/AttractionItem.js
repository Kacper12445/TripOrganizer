import React from "react";
import Card from "../../../common/Card";
import Text from "../../../common/Text";

export default function AttractionItem(props) {
  return (
    <Card>
      <Text>{props.attraction.name}</Text>
    </Card>
  );
}
