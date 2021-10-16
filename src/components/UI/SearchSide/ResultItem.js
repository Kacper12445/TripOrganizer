import React from "react";
import Card from "../../common/Card";
import Text from "../../common/Text";

export default function ResultItem(props) {
  return (
    <Card
      height="30%"
      width="100%"
      backGroundColor="purple"
      justifyContent="spacer-between"
    >
      <Card backGroundColor="black" height="100%" width="35%"></Card>
      <Card flexDirection="column" width="65%">
        <Card>
          <Text>{props.name}</Text>
        </Card>
        <Card>
          <Text>{props.description}</Text>
        </Card>
      </Card>
    </Card>
  );
}
