import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/common/Button";
import { useSelector } from "react-redux";
import Card from "../components/common/Card";
import Text from "../components/common/Text";
import { useDispatch } from "react-redux";
import { hotelActions } from "../store/Slices/hotel";
import { routeActions } from "../store/Slices/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import createNotification from "./Notification";
import * as VAR from "../constants/Consts";

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
        .post(`${VAR.BACKEND_URL}trip/find-route`, {
          origin: coords.originCoords,
          destination: coords.destinationCoords,
        })
        .then((res) => {
          dispatch(
            routeActions.setRoute({
              instruction: res.data.data,
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
    let checkInYear = checkInMonth === 1 ? year + 1 : year;
    return `${checkInYear}-${
      checkInMonth < 10 ? `0${checkInMonth}` : `${checkInMonth}`
    }-${day < 10 ? `0${day}` : `${day}`}`;
  };
  const findHotel = () => {
    let checkInDate = getCheckInDate();
    let options = {
      headers: {
        "x-rapidapi-host": VAR.TRAVEL_ADVISOR_URL,
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
      params: {
        latitude: coords.destinationCoords.lat.toFixed(3),
        longitude: coords.destinationCoords.lng.toFixed(3),
        lang: "en_US",
        hotel_class: VAR.HOTEL_CLASS,
        limit: "30",
        adults: VAR.ADULTS_NUMBER,
        rooms: VAR.ROOM_NUMBER,
        pricesmin: VAR.PRICE_MIN,
        pricesmax: VAR.PRICE_MAX,
        currency: VAR.CURRENCY,
        checkin: checkInDate,
        subcategory: VAR.SUBCATEGORY,
        nights: VAR.NIGHT_NUMBER,
        distance: VAR.SEARCH_DISTANCE,
      },
    };
    if (
      coords.destinationCoords.lat !== 0 &&
      coords.destinationCoords.lng !== 0
    ) {
      dispatch(hotelActions.setLoading(true));
      axios
        .get(VAR.GET_HOTEL_URL, options)
        .then((response) => {
          let tempHotelArray = [];
          for (let i = 0; i < VAR.HOTEL_NUMBER; i++) {
            tempHotelArray.push(response.data.data[i]);
          }
          dispatch(hotelActions.addHotel({ hotelArr: tempHotelArray }));
          tempHotelArray.forEach((element) => {
            getHotelAttractions(element);
          });
        })
        .catch(() => {
          createNotification("error", "Finding hotels failed");
        });
    }
  };

  const getHotelAttractions = (hotel) => {
    let options = {
      headers: {
        "x-rapidapi-host": VAR.TRAVEL_ADVISOR_URL,
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
      params: {
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        lunit: "km",
        currency: "EUR",
        distance: VAR.DISTANCE_FROM_HOTEL,
        lang: "en_US",
      },
    };
    axios
      .get(VAR.GET_ATTRACTION_URL, options)
      .then((response) => {
        dispatch(
          hotelActions.addHotelAttractions({
            id: hotel.location_id,
            attractions: response.data.data,
          })
        );
      })
      .catch(() => createNotification("error", "Finding attractions failed"));
    dispatch(hotelActions.setLoading(false));
  };

  return (
    <>
      <Card
        flexBasis="25%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        margin="15px 0 0 0"
      >
        <Button
          backGroundColor="rgb(0,255,110)"
          height="4rem"
          width="20%"
          borderRad="25px"
          alignItems="center"
          justifyContent="center"
          onClick={buttonClickHandler}
          minWidth="130px"
          hoverOpacity=".5"
        >
          <FontAwesomeIcon
            icon="search"
            style={{ fontSize: "2rem", color: "white", marginRight: "3%" }}
          />
          <Text textAlign="center" fontSize="2rem" color="white">
            Search
          </Text>
        </Button>
      </Card>
    </>
  );
}
