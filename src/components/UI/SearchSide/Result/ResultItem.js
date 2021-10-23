import React from "react";
import Card from "../../../common/Card";
import Text from "../../../common/Text";
import Img from "../../../common/Img";
export default function ResultItem(props) {
  return (
    <Card
      height="30%"
      width="90%"
      justifyContent="spacer-between"
      border="1px solid black"
    >
      <Img src={props.hotel.photo} height="100%" width="35%" />
      <Card flexDirection="column" height="100%" width="65%">
        <Card flexBasis="20%">
          <Text fontSize="20px" fontWeight="bold">
            {props.hotel.name}
          </Text>
        </Card>
        <Card flexBasis="70%">
          <Text>
            {props.hotel.price} - {props.hotel.rating} -{" "}
            {props.hotel.hotel_class}
          </Text>
          <Text>{props.hotel.hotel_attractions}</Text>
        </Card>
      </Card>
    </Card>
  );
}
