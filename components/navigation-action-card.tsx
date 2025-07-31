"use client";

import { Home, HomeIcon, Plus, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useDisplayWidth } from "@/hooks/use-display-width";
import { Separator } from "./ui/separator";

export default function ActionCard() {
  const isPlaying = usePlayerStore((state: any) => state.isPlaying);
  const setIsPlaying = usePlayerStore((state: any) => state.setIsPlaying);

  const { width, isMobile, isDesktop, getCurrentBreakpoint } =
    useDisplayWidth();

  return (
    <div
      className="bottom-5 left-5 right-5 flex"
      style={{ maxWidth: width / 3.2 / 1.8, width: "1000px" }}
    >
      <div className="bg-white/10 backdrop-blur-md border-t border-white/10 rounded-xl flex flex-col shadow-lg w-full items">
        <Button
          variant="card"
          className="w-full justify-start h-14 flex items-center text-lg font-semibold"
        >
          <SearchIcon />
          <span>Navigate</span>
        </Button>
        <div className="h-[2px] bg-white/30" />
        <div className="flex flex-row">
          <Button
            variant="card"
            className="w-full justify-start h-14 flex items-center text-lg font-semibold"
          >
            <HomeIcon />
            <span>Home</span>
          </Button>
          <Separator orientation="vertical" />
          <Button
            variant="card"
            className="w-full justify-start h-14 flex items-center text-lg font-semibold"
          >
            <HomeIcon />
            <span>Work</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
