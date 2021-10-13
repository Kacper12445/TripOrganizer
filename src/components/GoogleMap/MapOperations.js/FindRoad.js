import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../common/Button";

export default function FindRoad(props) {
  const [coordsState, setCoordsState] = useState(false);

  useEffect(() => {
    if (props.originCoords.lat && props.destinationCoords.lat)
      setCoordsState(true);
  }, [
    props.originCoords.lat,
    props.originCoords.lng,
    props.destinationCoords.lat,
    props.destinationCoords.lng,
  ]);

  const findHotel = () => {
    // let urlParams = {
    //   params: {
    //     latitude: props.destinationCoords.lat,
    //     longitude: props.destinationCoords.lng,
    //     lang: "en_US",
    //     hotel_class: "1,2,3,4,5",
    //     limit: 30,
    //     adults: "1",
    //     rooms: "1",
    //     pricemin: "10",
    //     pricemax: "1000",
    //     currency: "EUR",
    //     checkin: "2021-11-20",
    //     subcategory: "hotel,bb,speciality",
    //     nights: "5",
    //     distance: "500",
    //   },
    // };
    // let urlHeader = {
    //   headers: {
    //     "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    //     "x-rapidapi-key": "c52cfc7653mshfa80f2685f2bc96p14a6bcjsn98ea93c50a74",
    //   },
    // };
    // if (
    //   props.destinationCoords.lat !== 0 &&
    //   props.destinationCoords.lng !== 0
    // ) {
    //   axios.get(
    //     "https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng",
    //     urlParams,
    //     urlHeader
    //   );
    // }
    let options = {
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "c52cfc7653mshfa80f2685f2bc96p14a6bcjsn98ea93c50a74",
      },
      params: {
        latitude: props.destinationCoords.lat,
        longitude: props.destinationCoords.lng,
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
      props.destinationCoords.lat !== 0 &&
      props.destinationCoords.lng !== 0
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

  const buttonHandler = () => {
    if (coordsState) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${props.originCoords.lat},${props.originCoords.lng}&destination=${props.destinationCoords.lat},${props.destinationCoords.lng}&mode=${props.travelMode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        )
        .then((res) => {
          console.log(res.data.routes[0].legs[0]);
          console.log(res.data.routes[0].legs[0].steps);
          // console.log(res.data.routes[0].legs[0].start_address);
          // console.log(res.data.routes[0].legs[0].end_address);
          // console.log(res.data.routes[0].legs[0].distance.text);
          // console.log(res.data.routes[0].legs[0].duration.text);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Button onClick={buttonHandler}>Search</Button>
      <Button onClick={findHotel}>FindHotel</Button>
    </>
  );
}
