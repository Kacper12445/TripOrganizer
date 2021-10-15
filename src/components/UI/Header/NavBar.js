import React from "react";
import Card from "../../common/Card";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
  const itemList = [
    {
      name: "Home",
    },
    {
      name: "Find Trip",
    },
  ];
  return (
    <>
      <Card flexBasis="70%">
        {itemList.map((element, index) => {
          return <NavBarItem key={index} title={element.name}></NavBarItem>;
        })}
      </Card>
      ;
    </>
  );
}
