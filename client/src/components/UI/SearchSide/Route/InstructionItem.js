import React from "react";
import Card from "../../../common/Card";
import Text from "../../../common/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function InstructionItem(props) {
  return (
    <Card
      //   flexDirection="column"

      height="30%"
      flexBasis="32%"
      alignItems="center"
      justifyContent="space-around"
    >
      <Card flexDirection="column" width="60%">
        <Card>
          <Text>
            ({props.hint.distance} | {props.hint.duration})
          </Text>
        </Card>
        <Card>
          <FontAwesomeIcon
            icon={"long-arrow-alt-right"}
            style={{ color: "green", fontSize: "45px" }}
          ></FontAwesomeIcon>
        </Card>
      </Card>
      <Card
        height="100%"
        backGroundColor="lightgreen"
        borderRad="20px"
        alignItems="center"
      >
        <Text
          fontSize="14px"
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          {props.hint.text}
        </Text>
      </Card>
    </Card>
  );
}
