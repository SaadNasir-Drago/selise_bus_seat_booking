"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Bus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const seats = [
  "A1",
  "A2",
  "A3",
  "B1",
  "B2",
  "B3",
  "C1",
  "C2",
  "C3",
  "D1",
  "D2",
  "D3",
  "E1",
  "E2",
  "E3",
];
const buses = ["S098", "S099", "S010"];

export default function SeatUI() {
  const searchParams = useSearchParams();
  const adminView = searchParams.get("adminview") === "true"; // Check if admin view is enabled
  const selectedBusParam = searchParams.get("bus") || buses[0]; // Default to the first bus

  const bookings = useSelector((state: RootState) => state.busBookings); // Retrieve bookings from Redux store

  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [seatDetails, setSeatDetails] = useState<null | {
    name: string;
    destination: string;
    time: string;
  }>(null);
  const [selectedBus, setSelectedBus] = useState<string>(selectedBusParam);
  const [seatNotBooked, setSeatNotBooked] = useState<boolean>(false);

  useEffect(() => {
    const busData = bookings[selectedBus] || {};
    setBookedSeats(Object.keys(busData));
  }, [bookings, selectedBus]);

  const handleSeatClick = (seat: string) => {
    if (bookedSeats.includes(seat)) {
      const busData = bookings[selectedBus] || {};
      setSeatDetails(busData[seat] || null);
      setSelectedSeat(seat);
      setSeatNotBooked(false); // Ensure the unbooked modal doesn't show
    } else {
      if (adminView) {
        setSeatNotBooked(true); // Show unbooked modal for admin
        setSelectedSeat(null); // Ensure details modal doesn't show
      } else {
        window.location.href = `/seat-booking-form?seat=${seat}&bus=${selectedBus}`;
      }
    }
  };

  return (
    <>
    {/* Navigation Bar */}
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <Bus size={32} strokeWidth={2} />
          <h1 className="text-xl font-bold">Selise Bus Shuttle</h1>
        </div>
      </nav>
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full max-w-lg p-4">
        {/* Admin/User Panel Button */}
        <div className="mb-4 flex justify-end">
          <Button
            onClick={() =>
              (window.location.href = adminView ? "/" : "/admin-panel")
            }
          >
            {adminView ? "Go to User Panel" : "Go to Admin Panel"}
          </Button>
        </div>

        {/* Bus Selector */}
        <div className="mb-4">
          <label
            htmlFor="bus-selector"
            className="block text-sm font-medium mb-2"
          >
            Select Bus
          </label>
          <Select
            value={selectedBus}
            onValueChange={(value) => setSelectedBus(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a bus" />
            </SelectTrigger>
            <SelectContent>
              {buses.map((bus) => (
          <SelectItem key={bus} value={bus}>
            {bus}
          </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        

        {/* Seat Grid */}
        <Card className="mb-4">
          {/* Circular UI Element for Driver */}
          <div className="flex justify-end mb-4 mt-4 mr-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">Driver</span>
            </div>
          </div>
          <CardContent className="grid grid-cols-3 gap-2 mt-4">
            {seats.map((seat) => (
              <Button
                key={seat}
                className={`h-12 ${
                  bookedSeats.includes(seat) ? "bg-gray-400" : "bg-white"
                } text-black hover:text-white`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Dialog for Booked Seat */}
        <Dialog
          open={!!selectedSeat && !seatNotBooked}
          onOpenChange={() => setSelectedSeat(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Details for Seat {selectedSeat}</DialogTitle>
              {seatDetails ? (
                <div className="mt-2">
                  <p>
                    <strong>Name:</strong> {seatDetails.name}
                  </p>
                  <p>
                    <strong>Destination:</strong> {seatDetails.destination}
                  </p>
                  <p>
                    <strong>Time:</strong> {seatDetails.time}
                  </p>
                </div>
              ) : (
                <p>No details available for this seat.</p>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Dialog for Unbooked Seat in Admin View */}
        <Dialog
          open={seatNotBooked}
          onOpenChange={() => setSeatNotBooked(false)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>This seat has not been booked.</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Legend */}
        <div className="mb-4 flex justify-center items-center">
          <div className="flex items-center mr-4">
            <div className="w-4 h-4 bg-gray-400 mr-2"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border mr-2"></div>
            <span>Unbooked</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
