import React from "react";
import Map from "../components/UI/Map";
import Header from "../components/UI/Header/Header";
import Searching from "../components/UI/SearchSide/Searching";
import Card from "../components/common/Card";

export default function SearchPage() {
  return (
    <>
      <Header height="10vh" width="100vw" backGroundColor="red" />
      <Card height="90vh" justifyContent="space-between">
        <Searching />
        <Map />
      </Card>
    </>
  );
}
