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
      margin={props.margin}
      backGroundColor={props.backGroundColor}
    >
      <Logo
        logoLetterSpacing={props.logoLetterSpacing}
        logoFZ={props.logoFZ}
        logoSize={props.logoSize}
      />
      <NavBar
        navItemSize={props.navItemSize}
        navItemHeight={props.navItemHeight}
      />
    </Card>
  );
}
