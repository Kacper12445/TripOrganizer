import React from "react";
import Card from "../../common/Card";
import NavBar from "./NavBar";
import Logo from "./Logo";

export default function Header() {
  return (
    <Card height="10vh" width="100vw" backGroundColor="red">
      <Logo />
      <NavBar />
    </Card>
  );
}
