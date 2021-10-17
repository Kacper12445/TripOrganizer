import React from "react";
import Card from "../../../common/Card";
import Text from "../../../common/Text";

export default function ResultItem(props) {
  return (
    <Card
      height="30%"
      width="90%"
      justifyContent="spacer-between"
      border="2px solid black"
    >
      <Card height="100%" width="35%" border="2px solid black"></Card>
      <Card
        flexDirection="column"
        height="100%"
        width="65%"
        border="2px solid black"
      >
        <Card flexBasis="20%">
          <Text fontSize="20px" fontWeight="bold">
            {props.name}
          </Text>
        </Card>
        <Card flexBasis="70%">
          <Text>{props.description}</Text>
        </Card>
      </Card>
    </Card>
  );
}
