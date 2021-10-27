import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../common/Button";
import { useSelector } from "react-redux";
import Card from "../../common/Card";
import Text from "../../common/Text";
import { useDispatch } from "react-redux";
import { hotelActions } from "../../../store/Slices/hotel";
import { routeActions } from "../../../store/Slices/route";

export default function FindRoad() {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.coord.coords);
  const hotels = useSelector((state) => state.hotel.hotels);
  const route = useSelector((state) => state.route.routeHint);
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

  const findHotel = () => {
    let options = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_TRAVEL_ADVISOR_HOST,
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
        checkin: "2021-11-20",
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
        .get(
          "https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng",
          options
        )
        .then((response) => {
          console.log(response.data.data);
          let tempHotelArray = [];
          for (let i = 0; i < 3; i++) {
            console.log(`Hotel ${i}: ${response.data.data[i].name}`);
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
        "x-rapidapi-host": process.env.REACT_APP_TRAVEL_ADVISOR_HOST,
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
    axios
      .get(
        "https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng",
        options
      )
      .then((response) => {
        console.log(response.data.data);
        dispatch(
          hotelActions.addHotelAttractions({
            id: hotel.location_id,
            attractions: response.data.data,
          })
        );
      });
  };

  const buttonClickHandler = () => {
    if (coordsState) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${coords.originCoords.lat},${coords.originCoords.lng}&destination=${coords.destinationCoords.lat},${coords.destinationCoords.lng}&mode=transit&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        )
        .then((res) => {
          console.log(res.data.routes[0].legs[0]);
          console.log(res.data.routes[0].legs[0].steps);
          // console.log(res.data.routes[0].legs[0].start_address);
          // console.log(res.data.routes[0].legs[0].end_address);
          // console.log(res.data.routes[0].legs[0].distance.text);
          // console.log(res.data.routes[0].legs[0].duration.text);
          dispatch(
            routeActions.setRoute({
              instruction: res.data.routes[0].legs[0],
            })
          );
          findHotel();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(route);
  }, [route]);

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
          <Text textAlign="center" fontSize="20px" color="white">
            Search
          </Text>
        </Button>
      </Card>
    </>
  );
}
