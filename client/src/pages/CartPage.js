import React from "react";
import Card from "../components/common/Card";
import Text from "../components/common/Text";
import Header from "../components/UI/Header/Header";
import beach from "../assets/beach.jpg";
import PurchasingForm from "../components/UI/CartPage/PurchasingForm";
import SummaryText from "../components/UI/CartPage/SummaryText";

export default function CartPage(props) {
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
          <SummaryText match={props.match} />
          <PurchasingForm />
        </Card>
      </Card>
    </>
  );
}
