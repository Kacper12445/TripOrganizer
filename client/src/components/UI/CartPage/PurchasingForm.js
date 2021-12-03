import React from "react";
import axios from "axios";
import { hotelActions } from "../../../store/Slices/hotel";
import { routeActions } from "../../..//store/Slices/route";
import { coordActions } from "../../../store/Slices/coord";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import createNotification from "../../../services/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../../common/Form";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Card from "../../common/Card";
import Text from "../../common/Text";

const FORM_DATA = [
  {
    name: "name",
    data: "",
    type: "text",
  },
  {
    name: "surname",
    data: "",
    type: "text",
  },
  {
    name: "phone number",
    data: "",
    type: "tel",
  },
  {
    name: "email",
    data: "",
    type: "email",
  },
];

export default function PurchasingForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const buyTrip = (e) => {
    const userData = {
      name: e.target[0].value,
      surname: e.target[1].value,
      phoneNumber: e.target[2].value,
      email: e.target[3].value,
    };
    e.preventDefault();
    axios
      .post("http://localhost:5000/ticket/buy", {
        name: userData.name,
        surname: userData.surname,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
      })
      .then((response) => {
        if (response.status === 200) {
          createNotification("success", response.data.message);
        }
      })
      .catch(() => createNotification("error", "Buying ticket failed"))
      .finally(() => {
        setTimeout(() => {
          dispatch(routeActions.resetRoute());
          dispatch(coordActions.changeToInitial());
          dispatch(hotelActions.changeToInitial());
          history.push("/searchingPage");
        }, 3000);
      });
  };
  return (
    <Form
      height="55%"
      width="100%"
      backGroundColor="rgba(160, 160, 160, .7)"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      borderBot="25px"
      onSubmit={buyTrip}
    >
      <Card
        width="70%"
        height="60%"
        backGroundColor="rgba(220, 220, 220, .8)"
        margin="2% 0 0 0"
        borderRad="25px"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
      >
        {FORM_DATA.map((item, index) => {
          return (
            <Card
              key={index}
              height="30%"
              width="33.4%"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text margin="0 0 0 3%" width="100%" height="20%" fontSize="12px">
                {item.name ? item.name.toUpperCase() : null}
              </Text>
              <Input
                height="70%"
                borderRad="25px"
                placeholder={`Enter your ${item.name}`}
                name={item.name}
                fontSize="1.5em"
                textAlign="center"
                type={item.type}
              />
            </Card>
          );
        })}
      </Card>
      <Button
        height="17%"
        width="20%"
        justifyContent="center"
        alignItems="center"
        backGroundColor="#002561"
        hoverColor="#7486A6"
        borderRad="10px"
        margin="2% 0"
        type="submit"
      >
        <FontAwesomeIcon
          icon="shopping-cart"
          style={{ fontSize: "2.8em", color: "white", marginRight: "5%" }}
        />
        <Text fontSize="2.8em" color="white">
          Buy now
        </Text>
      </Button>
    </Form>
  );
}
