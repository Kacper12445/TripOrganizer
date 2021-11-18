import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../common/Button";
import { useSelector } from "react-redux";
import Card from "../../common/Card";
import Text from "../../common/Text";
import { useDispatch } from "react-redux";
import { hotelActions } from "../../../store/Slices/hotel";
import { routeActions } from "../../../store/Slices/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  HOTEL_NUMBER,
  GET_ATTRACTION_URL,
  GET_HOTEL_URL,
  BACKEND_URL,
  TRAVEL_ADVISOR_URL,
} from "../../../constants/Consts";

export default function FindRoad() {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.coord.coords);
  const [coordsState, setCoordsState] = useState(false);

  useEffect(() => {
    if (coords.originCoords.lat && coords.destinationCoords.lat)
      setCoordsState(true);
  }, [
    coords.originCoords.lat,
    coords.originCoords.lng,
    coords.destinationCoords.lat,
    coords.destinationCoords.lng,
  ]);

  const buttonClickHandler = () => {
    if (coordsState) {
      axios
        .post(`${BACKEND_URL}trip/find-route`, {
          origin: coords.originCoords,
          destination: coords.destinationCoords,
        })
        .then((res) => {
          dispatch(
            routeActions.setRoute({
              instruction: res.data,
            })
          );
          findHotel();
        })
        .catch((err) => console.log(err));
    }
  };

  const getCheckInDate = () => {
    let newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    let checkInMonth = month + 1 > 12 ? 1 : month + 1;
    return `${year}-${
      checkInMonth < 10 ? `0${checkInMonth}` : `${checkInMonth}`
    }-${day}`;
  };
  const findHotel = () => {
    let checkInDate = getCheckInDate();
    let options = {
      headers: {
        "x-rapidapi-host": TRAVEL_ADVISOR_URL,
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
      params: {
        latitude: coords.destinationCoords.lat.toFixed(3),
        longitude: coords.destinationCoords.lng.toFixed(3),
        lang: "en_US",
        hotel_class: "3,4,5",
        limit: "30",
        adults: "1",
        rooms: "1",
        pricesmin: "10",
        pricesmax: "1000",
        currency: "EUR",
        checkin: checkInDate,
        subcategory: "hotel,bb,specialty",
        nights: "5",
        distance: "10",
      },
    };
    if (
      coords.destinationCoords.lat !== 0 &&
      coords.destinationCoords.lng !== 0
    ) {
      axios
        .get(GET_HOTEL_URL, options)
        .then((response) => {
          let tempHotelArray = [];
          for (let i = 0; i < HOTEL_NUMBER; i++) {
            tempHotelArray.push(response.data.data[i]);
          }
          dispatch(hotelActions.addHotel({ hotelArr: tempHotelArray }));
          tempHotelArray.forEach((element) => {
            getHotelAttractions(element);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getHotelAttractions = (hotel) => {
    let options = {
      headers: {
        "x-rapidapi-host": TRAVEL_ADVISOR_URL,
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
      params: {
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        lunit: "km",
        currency: "EUR",
        distance: 3,
        lang: "en_US",
      },
    };
    axios.get(GET_ATTRACTION_URL, options).then((response) => {
      dispatch(
        hotelActions.addHotelAttractions({
          id: hotel.location_id,
          attractions: response.data.data,
        })
      );
    });
  };

  return (
    <>
      <Card
        flexBasis="25%"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          backGroundColor="rgb(0,255,110)"
          height="100%"
          width="30%"
          borderRad="25px"
          alignItems="center"
          justifyContent="center"
          onClick={buttonClickHandler}
        >
          <FontAwesomeIcon
            icon="search"
            style={{ fontSize: "20px", color: "white", marginRight: "3%" }}
          />
          <Text textAlign="center" fontSize="20px" color="white">
            Search
          </Text>
        </Button>
      </Card>
    </>
  );
}
