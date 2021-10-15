import React from "react";
// import AirportSearching from "../components/Trip/FlightSearch/AirportSearching";
import Header from "../components/UI/Header/Header";
import Text from "../components/common/Text";
import Card from "../components/common/Card";
import OfferItem from "../components/UI/OfferItem";

const OFFER_DATA = [
  {
    name: "Tickets",
    icon: "ticket-alt",
  },
  {
    name: "Hotels",
    icon: "hotel",
  },
  {
    name: "Turist Attractions",
    icon: "map-marked",
  },
  {
    name: "Best Routes",
    icon: "route",
  },
];

export default function MainPage() {
  return (
    <Card
      flexDirection="column"
      height="100vh"
      backGroundColor="grey"
      justifyContent="space-around"
    >
      <Header
        height="30%"
        flexDirection="column"
        justifyContent="space-between"
        backGroundColor="navy"
        navItemSize="30%"
      />
      {/* <AirportSearching></AirportSearching> */}
      <Card
        flexDirection="column"
        justifyContent="space-around"
        alignItems="flex-start"
        height="60%"
        backGroundColor="orange"
      >
        <Card width="100%">
          <Text
            fontSize="80px"
            fontWeight="bold"
            color="white"
            textAlign="right"
          >
            Plan your trip
            <br /> with us
          </Text>
        </Card>
        <Card width="100%" height="30%">
          {OFFER_DATA.map((element, index) => {
            return (
              <OfferItem
                key={index}
                offerName={element.name}
                icon={element.icon}
              />
            );
          })}
        </Card>
      </Card>
    </Card>
  );
}
