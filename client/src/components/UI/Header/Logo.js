import React from "react";
import Card from "../../common/Card";
import Text from "../../common/Text";
import Img from "../../common/Img";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImg from "../../../assets/travel-logo.png";
import { Link } from "react-router-dom";

export default function Logo(props) {
  return (
    <Card alignItems="center" flexBasis="30%" justifyContent="center">
      <Link
        to="/"
        style={{
          display: "flex",
          textDecoration: "none",
          alignItems: "center",

          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Img
          src={logoImg}
          width={props.logoSize}
          height={props.logoSize}
          margin="0 2% 0 0"
        />
        <Text
          fontSize={props.logoFZ}
          letterSpace={props.logoLetterSpacing}
          cursor="pointer"
          color="white"
        >
          Trip Planner
        </Text>
      </Link>
    </Card>
  );
}
