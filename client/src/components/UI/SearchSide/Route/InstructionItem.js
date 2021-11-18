import React from "react";
import Card from "../../../common/Card";
import Text from "../../../common/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function InstructionItem(props) {
  return (
    <Card
      height="30%"
      flexBasis="32%"
      alignItems="center"
      justifyContent="space-around"
    >
      <Card flexDirection="column" width="50%">
        <Card>
          <Text>
            ({props.hint.distance} | {props.hint.duration})
          </Text>
        </Card>
        <Card>
          <FontAwesomeIcon
            icon={"long-arrow-alt-right"}
            style={{ color: "green", fontSize: "3.8rem" }}
          ></FontAwesomeIcon>
        </Card>
      </Card>
      <Card
        height="100%"
        backGroundColor="lightgreen"
        borderRad="10px"
        alignItems="center"
      >
        <Text
          fontSize="1.2rem"
          fontWeight="bold"
          textAlign="center"
          color="white"
          padding="5px"
        >
          {props.hint.text}
        </Text>
      </Card>
    </Card>
  );
}
