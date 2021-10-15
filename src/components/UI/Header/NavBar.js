import React from "react";
import Card from "../../common/Card";
import NavBarItem from "./NavBarItem";

export default function NavBar(props) {
  const itemList = [
    {
      name: "Home",
    },
    {
      name: "Find Trip",
    },
    {
      name: "About us",
    },
    {
      name: "Contact",
    },
  ];
  return (
    <>
      <Card flexBasis={props.navItemSize} alignItems="center">
        {itemList.map((element, index) => {
          return <NavBarItem key={index} title={element.name}></NavBarItem>;
        })}
      </Card>
      ;
    </>
  );
}
