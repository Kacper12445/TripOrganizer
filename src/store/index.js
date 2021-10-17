import { configureStore } from "@reduxjs/toolkit";
import coordReducer from "./Slices/coord";
import authReducer from "./Slices/auth";

const store = configureStore({
  reducer: { coord: coordReducer, auth: authReducer },
});

export default store;
