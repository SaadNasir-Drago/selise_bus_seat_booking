import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookingDetails = {
  name: string;
  destination: string;
  time: string;
};

type BusBookings = {
  [bus: string]: {
    [seat: string]: BookingDetails;
  };
};

const loadInitialData = (): BusBookings => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("busBookings");
    return storedData ? JSON.parse(storedData) : {};
  }
  return {};
};

const initialState: BusBookings = loadInitialData();

const busBookingsSlice = createSlice({
  name: "busBookings",
  initialState,
  reducers: {
    setAllBookings: (state, action: PayloadAction<BusBookings>) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("busBookings", JSON.stringify(action.payload));
      }
      return action.payload; // Replace state entirely
    },
    addOrUpdateBooking: (
      state,
      action: PayloadAction<{
        bus: string;
        seat: string;
        bookingDetails: BookingDetails;
      }>
    ) => {
      const { bus, seat, bookingDetails } = action.payload;

      if (!state[bus]) {
        state[bus] = {};
      }
      state[bus][seat] = bookingDetails;

      if (typeof window !== "undefined") {
        localStorage.setItem("busBookings", JSON.stringify(state));
      }
    },
  },
});

export const { setAllBookings, addOrUpdateBooking } = busBookingsSlice.actions;
export default busBookingsSlice.reducer;
