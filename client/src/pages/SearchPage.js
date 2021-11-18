import React from "react";
import Map from "../components/UI/MapSide/Map";
import Header from "../components/UI/Header/Header";
import Searching from "../components/UI/SearchSide/Result/Searching";
import Card from "../components/common/Card";

export default function SearchPage() {
  return (
    <>
      <Header
        height="10vh"
        width="100vw"
        backGroundColor="#002561"
        navItemSize="70%"
        navItemHeight="60%"
        logoFZ="3.7rem"
        logoSize="4rem"
      />
      <Card height="90vh" width="100vw" justifyContent="space-between">
        <Searching />
        <Map />
      </Card>
    </>
  );
}
