import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../common/Card";
import Text from "../../common/Text";
import axios from "axios";
import ResultItem from "../SearchSide/Result/ResultItem";

export default function SummaryText(props) {
  const [selectedHotel, setSelectedHotel] = useState();
  const hotels = useSelector((state) => state.hotel.hotels);
  const route = useSelector((state) => state.route.routeHint);

  const [tripData, setTripData] = useState({
    distance: 0,
    price: 0,
    duration: 0,
  });

  const formatString = (text) => {
    let result = 0;
    let newText = text;
    newText = newText.replace(/€/g, "");
    newText = newText.split("-");

    result = getMediumPrice(newText);
    return result;
  };
  const getMediumPrice = (arr) => {
    let result = arr.reduce((acc, curr) => parseInt(acc) + parseInt(curr));
    return result / 2;
  };

  const calcPrice = (distanceValue, duration) => {
    axios
      .post("http://localhost:5000/ticket/price", {
        distance: distanceValue,
      })
      .then((res) => {
        setTripData({
          price: res.data.ticketPrice,
          distance: tripData.distance,
          duration: duration,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let distance = 0;
    let duration = 0;
    if (hotels) {
      let hotel = hotels.find((item) => {
        return item.location_id === props.match.params.hotelId;
      });
      setSelectedHotel(hotel);
    }

    if (route) {
      let distanceArr = [];
      let timeArr = [];
      route.forEach((element) => {
        distanceArr.push(element.distanceValue);
        timeArr.push(element.durationValue);
      });
      distance = distanceArr.reduce((acc, curr) => acc + curr);
      duration = timeArr.reduce((acc, curr) => acc + curr);
      setTripData({
        distance: distance / 1000,
        price: tripData.price,
        duration: duration,
      });
      calcPrice(distance / 1000, (duration / 3600).toFixed(0));
    }
  }, [
    setSelectedHotel,
    selectedHotel,
    hotels,
    props.match.params.hotelId,
    route,
    tripData.price,
  ]);

  return (
    <Card height="40%" width="100%" justifyContent="flex-start">
      <Card width="60%">
        {selectedHotel && (
          <ResultItem
            hotel={selectedHotel}
            visible={false}
            width="100%"
            margin="0"
          />
        )}
      </Card>
      <Card
        width="40%"
        flexDirection="column"
        justifyContent="flex-start"
        overflow="scroll"
      >
        <Text
          fontSize="26px"
          color="white"
          textAlign="center"
          margin="1% 0 2% 0"
          fontWeight="bold"
        >
          Congratulations of great choice <br />
        </Text>
        <Text fontSize="1.3em" color="white" margin="1% 5%">
          Hotel {selectedHotel && selectedHotel.name} is one of the best hotels
          in your destination
        </Text>
        <Text fontSize="1.3em" color="white" margin="1% 5%">
          The price for staying in selected hotel for 1 adult for 5 night costs
          around {selectedHotel && selectedHotel.price}
        </Text>
        <Text fontSize="1.3em" color="white" margin="1% 5%">
          Using public communication transport you will pay approximately{" "}
          {tripData.price && tripData.price}€. Transport is going to last about{" "}
          {tripData.duration && tripData.duration} hours
        </Text>
        <Text
          fontSize="1.8em"
          color="white"
          margin="1% 5%"
          textAlign="center"
          fontWeight="bold"
        >
          Summary
        </Text>
        <Text fontSize="1.3em" color="white" margin="1% 5%">
          Total Price: {selectedHotel && formatString(selectedHotel.price)}€{" "}
          <br />
          If you are committed to this offer, please fill the form below
        </Text>
      </Card>
    </Card>
  );
}
