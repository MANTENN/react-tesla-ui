"use client";

import {
  Volume2,
  Car,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClimateStore } from "@/stores/useClimateStore";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ClimateToggleGroup,
  SecurityToggleGroup,
} from "@/components/toggle-groups";
import { NavigationPanel } from "@/components/navigation-panel";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";

function ClimatePopoverPortal({
  passenger = false,
  position,
  onClose,
}: {
  passenger?: boolean;
  position: { x: number; y: number };
  onClose: () => void;
}) {
  const { split, setSplit, temperature, setTemperature, passengerTemp } =
    useClimateStore();

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div
        className="px-6 py-4 bg-white/10 backdrop-blur-xl rounded-xl p-6 text-white text-sm pointer-events-auto border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row gap-4 items-center justify-between">
          {/* defrost windshield and rear window */}
          <div className="flex flex-row group">
            <Button variant="ghost">+</Button>
            <Button variant="ghost">-</Button>
          </div>
          {/* heat seater */}
          <div className="flex flex-row group">
            <Button variant="ghost">Auto</Button>
            <Button variant="ghost">H/C</Button>
          </div>
          <Button variant="ghost">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-row gap-4 items-center justify-between">
          <Slider
            value={[passenger ? passengerTemp : temperature]}
            min={59}
            max={83}
            defaultValue={[passenger ? passengerTemp : temperature]}
            className="w-full"
            onValueChange={(value) => {
              setTemperature("set", passenger, value[0]);
            }}
          />
          <Button
            variant="ghost"
            className={cn(split && "text-blue-600")}
            onClick={() => setSplit(!split)}
          >
            Split
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ClimateControls({ passenger = false }: { passenger?: boolean }) {
  const { temperature, keepAcOnMode, split, passengerTemp, setTemperature } =
    useClimateStore();
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const displayTemperature = split && passenger ? passengerTemp : temperature;

  const handleChevronClick = (direction: "+" | "-") => {
    setTemperature(direction, split ? passenger : false);

    // Calculate position for the popover
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopoverPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }

    setShowPopover(true);

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer
    timerRef.current = setTimeout(() => {
      setShowPopover(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-3 items-center gap-3 relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="w-16 h-16 hover:bg-transparent hover:text-gray-500 [&_svg]:size-5 justify-self-end"
        onClick={() => handleChevronClick("-")}
      >
        <ChevronLeft className="bg-opacity/10" />
      </Button>
      <div className="flex flex-col items-start justify-self-start">
        {keepAcOnMode !== "off" && (
          <span className="text-sm text-gray-500">{keepAcOnMode}</span>
        )}
        <span className="text-5xl font-light text-center">
          {displayTemperature === 59
            ? "LO"
            : displayTemperature === 83
            ? "HI"
            : displayTemperature}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="w-16 h-16 hover:bg-transparent hover:text-gray-500 [&_svg]:size-5 justify-self-start"
        onClick={() => handleChevronClick("+")}
      >
        <ChevronRight className="bg-opacity/10" />
      </Button>

      {showPopover && (
        <ClimatePopoverPortal
          passenger={passenger}
          position={popoverPosition}
          onClose={() => {
            setShowPopover(false);
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
          }}
        />
      )}
    </div>
  );
}

export default function BottomPanel() {
  return (
    <div className="relative bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10">
      <div className="px-6 py-4">
        {/* App Dock and Controls */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 group rounded-xl hover:text-gray-500 hover:bg-transparent [&_svg]:size-9"
          >
            <Car className="w-14 h-14" />
          </Button>
          <ClimateControls />
          {/* Navigation Panel */}
          <NavigationPanel />

          {/* Volume Control */}
          <ClimateControls passenger />
          <div className="flex items-center gap-3">
            <Volume2 className="w-6 h-6" />
            <div className="w-20 h-1 bg-gray-600 rounded-full">
              <div className="w-3/4 h-full bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
