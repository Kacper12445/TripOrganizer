import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../common/Button";
import { useSelector } from "react-redux";
import Card from "../../common/Card";
import Text from "../../common/Text";

export default function FindRoad(props) {
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

  const findHotel = () => {
    let options = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_TRAVEL_ADVISOR_HOST,
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
      params: {
        latitude: coords.destinationCoords.lat,
        longitude: coords.destinationCoords.lng,
        lang: "en_US",
        hotel_class: "1,2,3,4,5",
        limit: "30",
        adults: "1",
        rooms: "1",
        pricesmin: "10",
        pricesmax: "1000",
        currency: "EUR",
        checkin: "2021-11-20",
        subcategory: "hotel,bb,specialty",
        nights: "5",
        distance: "500",
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
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const buttonClickHandler = () => {
    if (coordsState) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${coords.originCoords.lat},${coords.originCoords.lng}&destination=${coords.destinationCoords.lat},${coords.destinationCoords.lng}&mode=transit&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        )
        .then((res) => {
          // console.log(res.data.routes[0].legs[0]);
          console.log(res.data.routes[0].legs[0].steps);
          // console.log(res.data.routes[0].legs[0].start_address);
          // console.log(res.data.routes[0].legs[0].end_address);
          // console.log(res.data.routes[0].legs[0].distance.text);
          // console.log(res.data.routes[0].legs[0].duration.text);
          findHotel();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {/* <Button onClick={findHotel}>FindHotel</Button> */}
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
