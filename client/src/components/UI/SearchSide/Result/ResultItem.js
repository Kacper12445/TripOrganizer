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
      width="90%"
      justifyContent="spacer-between"
      border="1px solid black"
      margin="2% 0"
      backGroundColor="lightgrey"
    >
      <Card width="35%" flexDirection="column" alignItems="center">
        <Img
          src={props.hotel.photo}
          height={props.visible ? "80%" : "100%"}
          width="100%"
        />
        {props.visible && (
          <Link
            to={"/card"}
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
                  fontSize: "20px",
                  margin: "0 5% 0 0",
                  height: "100%",
                  color: "white",
                }}
              />
              <Text fontSize="20px" color="white">
                Choose this offer
              </Text>
            </Button>
          </Link>
        )}
      </Card>
      <Card flexDirection="column" height="100%" width="65%">
        <Card border_bot="1px solid black" padding="1% 0">
          <Text fontSize="30px" fontWeight="bold">
            {props.hotel.name}
          </Text>
        </Card>
        <Card flexDirection="column" margin="2% 0 0 0">
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
        <Card flexDirection="column" justifyContent="center" margin="2% 0">
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
