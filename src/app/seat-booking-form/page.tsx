"use client";

import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { addOrUpdateBooking } from "@/redux/busBookingsSlice";
import { useState } from "react";

const destinations = ["Mirpur 11", "Dhanmondi", "Gulshan"];
const times = ["8:00 am", "9:00 am", "5:00 pm", "6:00 pm"];
const buses = ["S098", "S099", "S010"];

export default function SeatBookingForm() {
  const searchParams = useSearchParams();
  const seat = searchParams.get("seat") || "A1";
  const busParam = searchParams.get("bus") || buses[0]; // Default to the first bus if not provided

  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.busBookings); // Access current bookings from Redux

  const [name, setName] = useState<string>("");
  const [bus, setBus] = useState<string>(busParam); // Initialize with query param
  const [destination, setDestination] = useState<string>(destinations[0]);
  const [time, setTime] = useState<string>(times[0]);

  const handleBooking = () => {
    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (bookings[bus]?.[seat]) {
      alert(`Seat ${seat} is already booked for Bus ${bus}.`);
      return;
    }

    dispatch(
      addOrUpdateBooking({
        bus,
        seat,
        bookingDetails: {
          name,
          destination,
          time,
        },
      })
    );

    alert(`Seat ${seat} on Bus ${bus} booked successfully!`);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-bold text-center">Seat Booking Form</h2>
        <CardContent className="space-y-4 mt-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-blue-600 font-bold">Bus Number:</h1>
            <h1>{bus}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <h1 className="text-blue-600 font-bold">Seat Number:</h1>
            <h1>{seat}</h1>
          </div>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger>
              <SelectValue placeholder="Select Destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest} value={dest}>
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select Time" />
            </SelectTrigger>
            <SelectContent>
              {times.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="w-full" onClick={handleBooking}>
            Book Seat
          </Button>
          {/* Back to Home Button */}
          <Button
            className="w-full mt-4"
            onClick={() => (window.location.href = "/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
