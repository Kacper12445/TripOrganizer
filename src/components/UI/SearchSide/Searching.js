import React from "react";
import TripForm from "./TripForm";
import SearchResults from "./SearchResults";
import Card from "../../common/Card";

export default function Searching() {
  return (
    <Card flexDirection="column" height="100%" flexBasis="65%">
      <TripForm />
      <SearchResults />
    </Card>
  );
}
