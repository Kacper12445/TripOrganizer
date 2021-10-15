import React from "react";
import Card from "../../common/Card";
import Text from "../../common/Text";

export default function NavBarItem(props) {
  return (
    <Card
      alignItems="center"
      width="15%"
      border_bot="solid grey 1px"
      height="80%"
      cursor="pointer"
      className="navItem"
    >
      <Text fontSize="25px" color="grey" className="navItemText">
        {props.title}
      </Text>
    </Card>
  );
}
