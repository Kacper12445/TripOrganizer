import { configureStore } from "@reduxjs/toolkit";
import coordReducer from "./Slices/coord";
import mapReducer from "./Slices/map";
import hotelReducer from "./Slices/hotel";

const store = configureStore({
  reducer: { coord: coordReducer, map: mapReducer, hotel: hotelReducer },
});

export default store;
