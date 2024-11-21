import { configureStore } from "@reduxjs/toolkit";
import busBookingsReducer from "./busBookingsSlice";

export const store = configureStore({
  reducer: {
    busBookings: busBookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
