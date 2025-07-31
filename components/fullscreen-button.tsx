"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFullscreen } from "@/hooks/use-fullscreen";

export default function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFullscreen}
      className="fixed top-4 right-4 z-50 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm border border-white/20"
      title={isFullscreen ? "Exit full screen" : "Enter full screen"}
    >
      {isFullscreen ? (
        <Minimize2 className="h-4 w-4" />
      ) : (
        <Maximize2 className="h-4 w-4" />
      )}
    </Button>
  );
}
