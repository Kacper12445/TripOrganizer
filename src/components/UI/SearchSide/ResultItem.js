import React from "react";
import Card from "../../common/Card";
import Text from "../../common/Text";

export default function ResultItem(props) {
  return (
    <Card
      flexDirection="column"
      flexBasis="45%"
      height="30%"
      backGroundColor="purple"
    >
      <Card backGroundColor="black" height="80%" flexBasis="100%"></Card>
      <Text>{props.name}</Text>
    </Card>
  );
}
