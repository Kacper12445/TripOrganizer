import { configureStore } from "@reduxjs/toolkit";
import coordReducer from "./Slices/coord";
import mapReducer from "./Slices/map";

const store = configureStore({
  reducer: { coord: coordReducer, map: mapReducer },
});

export default store;
