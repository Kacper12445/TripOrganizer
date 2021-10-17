import React from "react";
import Card from "../../common/Card";
import NavBarItem from "./NavBarItem";

export default function NavBar(props) {
  const itemList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Find Trip",
      path: "/searchingPage",
    },
    {
      name: "About us",
      path: "/aboutUs",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];
  return (
    <>
      <Card flexBasis={props.navItemSize} alignItems="center">
        {itemList.map((element, index) => {
          return (
            <NavBarItem
              key={index}
              navItem={element}
              navItemHeight={props.navItemHeight}
            ></NavBarItem>
          );
        })}
      </Card>
      ;
    </>
  );
}
