import React from "react";
import Map from "../components/UI/Map";
import Header from "../components/UI/Header/Header";
import Searching from "../components/UI/SearchSide/Searching";
import Card from "../components/common/Card";

export default function SearchPage() {
  return (
    <>
      <Header
        height="10vh"
        width="100vw"
        backGroundColor="#002564"
        navItemSize="70%"
        navItemHeight="60%"
        logoFZ="30px"
      />
      <Card height="90vh" justifyContent="space-between">
        <Searching />
        <Map />
      </Card>
    </>
  );
}
