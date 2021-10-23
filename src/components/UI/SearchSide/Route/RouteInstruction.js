import React from "react";
import Card from "../../../common/Card";
import InstructionItem from "./InstructionItem";
import { useSelector } from "react-redux";

export default function RouteInstruction() {
  const route = useSelector((state) => state.route.routeHint);

  return (
    <Card
      backGroundColor="white"
      width="90%"
      height="45%"
      margin="5% 0"
      borderRad="25px"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-around"
    >
      {route.map((element, index) => {
        return <InstructionItem key={index} hint={element} />;
      })}
    </Card>
  );
}
