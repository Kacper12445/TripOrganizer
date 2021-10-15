import React from "react";
import Card from "../../common/Card";
import Text from "../../common/Text";

export default function NavBarItem(props) {
  return (
    <Card alignItems="center" flexBasis="100%" cursor="pointer">
      <Text fontSize="25px" color="white">
        {props.title}
      </Text>
    </Card>
  );
}
