"use client";

import { Home, HomeIcon, Plus, SearchIcon, ShipWheel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useDisplayWidth } from "@/hooks/use-display-width";
import { Separator } from "./ui/separator";

export default function FSDCard() {
  const { width, isMobile, isDesktop, getCurrentBreakpoint } =
    useDisplayWidth();

  return (
    <div
      className="bottom-5 left-5 right-5 flex flex-col gap-1"
      style={{ maxWidth: width / 3.2 / 1.8, width: "1000px" }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-start shadow-lg flex flex-row gap-4 items-center justify-between">
        <div>
          <div className="text-lg font-semibold mb-1">
            Start FSD (Supervised)
          </div>
          <div className="text-sm text-gray-400">
            Navigation destination required
          </div>
        </div>
        <div className="flex items-center justify-center w-10 h-10">
          <ShipWheel className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
