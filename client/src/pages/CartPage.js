import React, { useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Text from "../components/common/Text";
import Input from "../components/common/Input";
import Header from "../components/UI/Header/Header";
import ResultItem from "../components/UI/SearchSide/Result/ResultItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CartPage() {
  const [formData, setFormData] = useState([
    {
      labelName: "name",
      data: "",
    },
    {
      labelName: "surname",
      data: "",
    },
    {
      labelName: "phone number",
      data: "",
    },
    {
      labelName: "email",
      data: "",
    },
    {
      labelName: "gender",
      data: "",
    },
    {
      labelName: "birth date",
      data: "",
    },
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
            padding="2% 0 5% 0"
            backGroundColor="rgba(0, 0, 0, .5)"
            flexBasis="10%"
            borderTop="25px"
          >
            <Text fontSize="5em" color="white" fontWeight="bold">
              Purchasing Trip
            </Text>
          </Card>
          <Card backGroundColor="blue" flexBasis="30%" width="100%">
            {/* <ResultItem/> */}
          </Card>
          <Card
            flexBasis="60%"
            width="100%"
            backGroundColor="rgba(160, 160, 160, .7)"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            borderBot="25px"
          >
            <Card
              width="80%"
              height="80%"
              backGroundColor="rgba(220, 220, 220, .8)"
              margin="3% 0 0 0"
              borderRad="25px"
              justifyContent="space-around"
              alignItems="center"
              flexWrap="wrap"
            >
              {formData.map((item, index) => {
                return (
                  <Card height="20%" width="33.4%" flexDirection="column">
                    <Text>
                      {item.labelName ? item.labelName.toUpperCase() : null}
                    </Text>
                    <Input
                      key={index}
                      height="60%"
                      borderRad="25px"
                      placeholder={`Enter your ${item.labelName}`}
                      fontSize="1.5em"
                      textAlign="center"
                    />
                  </Card>
                );
              })}
            </Card>
            <Button
              height="20%"
              width="30%"
              justifyContent="center"
              alignItems="center"
              backGroundColor="lightgreen"
              hoverColor="rgba(144, 238, 144, .7)"
              borderRad="25px"
              margin="2% 0"
            >
              <FontAwesomeIcon
                icon="shopping-cart"
                style={{ fontSize: "4em", color: "white", marginRight: "5%" }}
              />
              <Text fontSize="4em" color="white">
                Buy now
              </Text>
            </Button>
          </Card>
        </Card>
      </Card>
    </>
  );
}
