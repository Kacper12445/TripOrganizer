import React from "react";
import Card from "../../../common/Card";
import Text from "../../../common/Text";
import Img from "../../../common/Img";
import Button from "../../../common/Button";
import AttractionItem from "./AttractionItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function ResultItem(props) {
  return (
    <Card
      width={props.width}
      justifyContent="spacer-between"
      border="1px solid black"
      margin={props.margin}
      backGroundColor="lightgrey"
      // height={props.height}
    >
      <Card width="35%" flexDirection="column" alignItems="center">
        <Img
          src={props.hotel.photo}
          height={props.visible ? "80%" : "100%"}
          width="100%"
        />
        {props.visible && (
          <Link
            to={`/cart/${props.hotel.location_id}`}
            style={{ textDecoration: "none", height: "20%", width: "100%" }}
          >
            <Button
              height="100%"
              width="100%"
              alignItems="center"
              justifyContent="center"
              backGroundColor="#34495E"
              hoverColor="#35596C"
            >
              <FontAwesomeIcon
                icon="paper-plane"
                style={{
                  fontSize: "1.8rem",
                  margin: "0 5% 0 0",
                  height: "100%",
                  color: "white",
                }}
              />
              <Text fontSize="2rem" color="white">
                Choose this offer
              </Text>
            </Button>
          </Link>
        )}
      </Card>
      <Card flexDirection="column" height="100%" width="65%">
        <Card border_bot="1px solid black" padding="1% 0">
          <Text fontSize="2.1rem" fontWeight="bold">
            {props.hotel.name}
          </Text>
        </Card>
        <Card flexDirection="column" margin="2% 0 0 0">
          <Text fontSize="1.5rem" margin="0 0 0 5%">
            <strong>Price: </strong> {props.hotel.price}
            <FontAwesomeIcon
              icon="money-bill-wave"
              style={{ color: "green", fontSize: "1.8rem", margin: "0 0 0 2%" }}
            />
          </Text>
          <Text fontSize="1.5rem" margin="0 0 0 5%" wordSpacing="2px">
            <strong>Rating: </strong>
            {props.hotel.rating}
            <FontAwesomeIcon
              icon="smile"
              style={{ color: "aqua", fontSize: "1.8rem", margin: "0 0 0 2%" }}
            />
          </Text>
          <Text fontSize="1.5rem" margin="0 0 0 5%">
            <strong>Hotel class: </strong> {props.hotel.hotel_class}
            <FontAwesomeIcon
              icon="star"
              style={{
                color: "yellow",
                fontSize: "1.8rem",
                margin: "0 0 0 2%",
              }}
            />
          </Text>
        </Card>
        <Card flexDirection="column" justifyContent="center" margin="2% 0">
          <Text textAlign="center" fontSize="1.8rem" fontWeight="bold">
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
