"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const buses = ["S098", "S099", "S010"];

export default function AdminPanel() {
  const [selectedBus, setSelectedBus] = useState<string>("S098");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent className="space-y-4 mt-4">
            <h2 className="text-xl font-bold text-center">Admin Panel</h2>
          <Select value={selectedBus} onValueChange={setSelectedBus}>
            <SelectTrigger>
              <SelectValue placeholder="Select Bus" />
            </SelectTrigger>
            <SelectContent>
              {buses.map((bus) => (
                <SelectItem key={bus} value={bus}>
                  {bus}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="mt-4 w-full"
            onClick={() =>
              (window.location.href = `/?bus=${selectedBus}&adminview=true`)
            }
          >
            See Details of Bus No. {selectedBus}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
