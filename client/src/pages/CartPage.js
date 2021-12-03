import React, { useState, useEffect } from "react";
import Card from "../components/common/Card";
import Text from "../components/common/Text";
import Header from "../components/UI/Header/Header";
import ResultItem from "../components/UI/SearchSide/Result/ResultItem";
import beach from "../assets/beach.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import PurchasingForm from "../components/UI/CartPage/PurchasingForm";

export default function CartPage(props) {
  const hotels = useSelector((state) => state.hotel.hotels);
  const route = useSelector((state) => state.route.routeHint);

  const [selectedHotel, setSelectedHotel] = useState();
  const [tripData, setTripData] = useState({
    distance: 0,
    price: 0,
    duration: 0,
  });

  // const [formData, setFormData] = useState([
  //   {
  //     name: "name",
  //     data: "",
  //     type: "text",
  //   },
  //   {
  //     name: "surname",
  //     data: "",
  //     type: "text",
  //   },
  //   {
  //     name: "phone number",
  //     data: "",
  //     type: "tel",
  //   },
  //   {
  //     name: "email",
  //     data: "",
  //     type: "email",
  //   },
  // ]);

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
    <>
      <Header
        height="10vh"
        width="100vw"
        backGroundColor="#002561"
        navItemSize="70%"
        navItemHeight="60%"
        logoFZ="40px"
        logoSize="40px"
      />
      <Card
        width="100vw"
        height="90vh"
        backGroundColor="rgba(100, 100, 100, .3)"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          width="90%"
          height="90%"
          borderRad="25px"
          backGroundColor="rgba(0, 37, 97, .5)"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Card
            width="100%"
            backGroundColor="rgba(0, 0, 0, .5)"
            height="15%"
            borderTop="25px"
            backGroundImg={beach}
          >
            <Card
              width="100%"
              height="100%"
              backGroundColor="rgba(0, 63, 114, 0.5)"
              borderTop="25px"
              alignItems="center"
            >
              <Text fontSize="4.5rem" color="white" fontWeight="bold">
                Purchasing Trip
              </Text>
            </Card>
          </Card>
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
                Hotel {selectedHotel && selectedHotel.name} is one of the best
                hotels in your destination
              </Text>
              <Text fontSize="1.3em" color="white" margin="1% 5%">
                The price for staying in selected hotel for 1 adult for 5 night
                costs around {selectedHotel && selectedHotel.price}
              </Text>
              <Text fontSize="1.3em" color="white" margin="1% 5%">
                Using public communication transport you will pay approximately{" "}
                {tripData.price && tripData.price}€. Transport is going to last
                about {tripData.duration && tripData.duration} hours
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
                Total Price:{" "}
                {selectedHotel && formatString(selectedHotel.price)}€ <br />
                If you are committed to this offer, please fill the form below
              </Text>
            </Card>
          </Card>
          <PurchasingForm />
        </Card>
      </Card>
    </>
  );
}
