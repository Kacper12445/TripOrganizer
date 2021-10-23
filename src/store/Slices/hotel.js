import { createSlice } from "@reduxjs/toolkit";

const initialHotelState = {
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
            latitude: element.lat,
            longitude: element.lng,
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
    addHotelAttractions(state, action) {
      const tempHotels = state.hotels;
      console.log(`Temp hotels ${tempHotels}`);
      const hotelIndex = tempHotels.findIndex(
        (hotel) => hotel.location_id === action.payload.id
      );
      console.log(`Hotel index ${hotelIndex}`);
      console.log(
        `ID, attr${action.payload.id}, ${action.payload.attractions}`
      );
      tempHotels[hotelIndex].hotel_attractions = action.payload.attractions;
      state.hotels = tempHotels;
    },
  },
});

export const hotelActions = hotelSlice.actions;
export default hotelSlice.reducer;
