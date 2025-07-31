"use client";

import { Phone, Calendar, Bluetooth, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavigationPanel() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="card" className="w-14 h-14">
        <Phone className="w-7 h-7 text-green-500 fill-green-500" />
      </Button>
      <Button variant="card" size="icon" className="w-14 h-14">
        <Calendar className="w-7 h-7" />
      </Button>
      <Button variant="card" size="icon" className="w-14 h-14 ">
        <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
          <span className="text-green-500 font-bold text-3xl">S</span>
        </div>
      </Button>
      <Button
        variant="card"
        size="icon"
        className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-xl"
      >
        <span className="text-2xl">♪</span>
      </Button>
      <Button
        variant="card"
        size="icon"
        className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-xl"
      >
        <span className="text-2xl">✓</span>
      </Button>
      <Button
        variant="card"
        className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-xl"
      >
        <MoreHorizontal className="w-7 h-7" />
      </Button>
      <Button
        variant="card"
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-xl"
      >
        <Bluetooth className="w-7 h-7" />
      </Button>
    </div>
  );
}
