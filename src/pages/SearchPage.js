import React from "react";
import Map from "../components/UI/Map";
import Header from "../components/UI/Header/Header";
import Searching from "../components/UI/SearchSide/Searching";
import Card from "../components/common/Card";

export default function SearchPage() {
  return (
    <>
      <Header />
      <Card height="90vh" justifyContent="space-between">
        <Searching />
        <Map />
      </Card>
    </>
  );
}
