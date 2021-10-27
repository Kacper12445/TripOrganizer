import React from "react";
import Card from "../../../common/Card";
import Text from "../../../common/Text";
import Img from "../../../common/Img";
import AttractionItem from "./AttractionItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ResultItem(props) {
  return (
    <Card
      height="40%"
      width="90%"
      justifyContent="spacer-between"
      border="1px solid black"
      margin="2% 0"
      backGroundColor="lightgrey"
    >
      <Img src={props.hotel.photo} height="100%" width="35%" />
      <Card flexDirection="column" height="100%" width="65%">
        <Card>
          <Text fontSize="30px" fontWeight="bold">
            {props.hotel.name}
          </Text>
        </Card>
        <Card flexDirection="column">
          <Text fontSize="18px" margin="0 0 0 5%">
            <strong>Price: </strong> {props.hotel.price}
            <FontAwesomeIcon
              icon="money-bill-wave"
              style={{ color: "green", fontSize: "22px", margin: "0 0 0 2%" }}
            />
          </Text>
          <Text fontSize="18px" margin="0 0 0 5%" wordSpacing="2px">
            <strong>Rating: </strong>
            {props.hotel.rating}
            <FontAwesomeIcon
              icon="smile"
              style={{ color: "aqua", fontSize: "22px", margin: "0 0 0 2%" }}
            />
          </Text>
          <Text fontSize="18px" margin="0 0 0 5%">
            <strong>Hotel class: </strong> {props.hotel.hotel_class}
            <FontAwesomeIcon
              icon="star"
              style={{ color: "yellow", fontSize: "22px", margin: "0 0 0 2%" }}
            />
          </Text>
        </Card>
        <Card flexDirection="column" justifyContent="center">
          <Text textAlign="center" fontSize="22px" fontWeight="bold">
            Attractions nearby hotel
          </Text>
          {props.hotel.hotel_attractions &&
            props.hotel.hotel_attractions.map((element, index) => {
              return <AttractionItem attraction={element} key={index} />;
            })}
        </Card>
      </Card>
    </Card>
  );
}
