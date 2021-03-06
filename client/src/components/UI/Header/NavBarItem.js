import React from "react";
import { Link } from "react-router-dom";
import Card from "../../common/Card";
import Text from "../../common/Text";

export default function NavBarItem(props) {
  return (
    <Card
      alignItems="center"
      width="15%"
      border_bot="solid white 2px"
      height={props.navItemHeight}
      cursor="pointer"
      className="navItem"
    >
      <Link to={props.navItem.path} style={{ textDecoration: "none" }}>
        <Text fontSize="2.7rem" className="navItemText" color="white">
          {props.navItem.name}{" "}
        </Text>
      </Link>
    </Card>
  );
}
