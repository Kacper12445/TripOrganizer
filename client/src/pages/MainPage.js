import React from "react";
import Header from "../components/UI/Header/Header";
import Text from "../components/common/Text";
import Card from "../components/common/Card";
import OfferItem from "../components/UI/OfferItem";
import airplane from "../assets/airplane.jpg";

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
    <Card backGroundImg={airplane}>
      <Card
        width="100%"
        flexDirection="column"
        height="100vh"
        justifyContent="space-around"
        backGroundColor="rgba(0, 63, 114, 0.6)"
      >
        <Header
          height="30%"
          flexDirection="column"
          justifyContent="space-between"
          navItemSize="30%"
          navItemHeight="80%"
          margin="6% 0 0 0"
          logoLetterSpacing="10px"
          logoFZ="50px"
          logoSize="55px"
        />
        {/* <AirportSearching></AirportSearching> */}
        <Card
          flexDirection="column"
          justifyContent="space-around"
          alignItems="flex-start"
          height="60%"
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
    </Card>
  );
}
