import React from "react";
import Card from "../../common/Card";
import NavBar from "./NavBar";
import Logo from "./Logo";

export default function Header(props) {
  return (
    <Card
      flexDirection={props.flexDirection}
      height={props.height}
      width={props.width}
      justifyContent={props.justifyContent}
      margin="5% 0 0 0"
    >
      <Logo />
      <NavBar navItemSize={props.navItemSize} />
    </Card>
  );
}
