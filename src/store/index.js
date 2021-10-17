import { configureStore } from "@reduxjs/toolkit";
import coordReducer from "./Slices/coord";
import authReducer from "./Slices/auth";
import mapReducer from "./Slices/map";

const store = configureStore({
  reducer: { coord: coordReducer, auth: authReducer, map: mapReducer },
});

export default store;
