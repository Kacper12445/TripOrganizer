import React, { useState, useEffect } from "react";
import Card from "../../../common/Card";
import InstructionItem from "./InstructionItem";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function RouteInstruction() {
  const route = useSelector((state) => state.route.routeHint);
  const [toggleInstruction, setToggleInstruction] = useState(false);

  const iconClickHandler = () => {
    setToggleInstruction(!toggleInstruction);
  };

  useEffect(() => {
    if (route.length > 1) {
      setToggleInstruction(true);
    } else {
      setToggleInstruction(false);
    }
  }, [route]);
  return (
    <>
      {!toggleInstruction && route.length > 1 && (
        <FontAwesomeIcon
          icon="eye"
          onClick={iconClickHandler}
          style={{
            fontSize: "30px",
            cursor: "pointer",
          }}
        />
      )}
      {toggleInstruction && (
        <Card
          backGroundColor="white"
          width="95%"
          height="45%"
          margin="2% 0 2% 0"
          borderRad="25px"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-around"
          position="relative"
          // overflow="scroll"
        >
          <FontAwesomeIcon
            onClick={iconClickHandler}
            icon="times-circle"
            style={{
              position: "absolute",
              top: "-5%",
              right: "-1.5%",
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
          {route.length > 1 &&
            route.map((element, index) => {
              return <InstructionItem key={index} hint={element} />;
            })}
        </Card>
      )}
    </>
  );
}
