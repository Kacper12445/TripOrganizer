import { createSlice } from "@reduxjs/toolkit";
import { ATTRACTIONS_NUMBER } from "../../constants/Consts";

const initialHotelState = {
  loading: false,
  hotels: [
    {
      location_id: 0,
      name: "",
      position: {
        latitude: 0,
        longitude: 0,
      },
      hotel_class: 0,
      photo: "",
      rating: 0,
      price: 0,
      hotel_attractions: [],
    },
  ],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState: initialHotelState,
  reducers: {
    addHotel(state, action) {
      const tempHotels = [];
      action.payload.hotelArr.forEach((element) => {
        tempHotels.push({
          location_id: element.location_id,
          name: element.name,
          position: {
            latitude: element.latitude,
            longitude: element.longitude,
          },
          hotel_class: element.hotel_class,
          photo: element.photo.images.large.url,
          rating: element.rating,
          price: element.price,
        });
      });

      state.hotels = tempHotels;
    },
    resetHotels(state) {
      state.hotels.length = 0;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    addHotelAttractions(state, action) {
      let tempHotels = state.hotels;
      let attractionsArr = [];
      let hotelIndex = tempHotels.findIndex(
        (hotel) => hotel.location_id === action.payload.id
      );
      action.payload.attractions.forEach((element) => {
        if (element.location_id === "0") {
          attractionsArr.push(element);
        } else if (element.hasOwnProperty("name")) {
          attractionsArr.unshift(element);
        }
      });
      attractionsArr = attractionsArr.slice(0, ATTRACTIONS_NUMBER);
      tempHotels[hotelIndex].hotel_attractions = attractionsArr;
      state.hotels = tempHotels;
    },
  },
});

export const hotelActions = hotelSlice.actions;
export default hotelSlice.reducer;
