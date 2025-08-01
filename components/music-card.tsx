"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Plus,
  BarChart3,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useDisplayWidth } from "@/hooks/use-display-width";

export default function actionCard() {
  const isPlaying = usePlayerStore((state: any) => state.isPlaying);
  const setIsPlaying = usePlayerStore((state: any) => state.setIsPlaying);

  const { width, isMobile, isDesktop, getCurrentBreakpoint } =
    useDisplayWidth();

  return (
    <div
      className="bg-gray-700/80 backdrop-blur-md border-t border-white/10 shadow-lg rounded-xl"
      style={{ maxWidth: width / 3.2, width: "1000px" }}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-4 w-full">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-t-l-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">ALBUM</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-lg mb-1 truncate">
              Майбутність (feat. KALUSH)
            </div>
            <div className="text-gray-400 text-sm mb-2 truncate">
              🎵 Артем Пивоваров
            </div>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-600">
          <div className="w-1/3 h-full bg-white"></div>
        </div>

        <div className="flex items-center justify-start gap-2 w-full">
          <Button
            variant="action"
            size="icon"
            className="hover:bg-transparent hover:text-white/10"
          >
            <SkipBack className="w-6 h-6" />
          </Button>
          <Button
            variant="action"
            size="icon"
            className="hover:bg-transparent hover:text-white/10"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
          <Button
            variant="action"
            size="icon"
            className="hover:bg-transparent hover:text-white/10"
          >
            <SkipForward className="w-6 h-6" />
          </Button>
          <Button
            variant="action"
            size="icon"
            className="hover:bg-transparent hover:text-white/10"
          >
            <Plus className="w-6 h-6" />
          </Button>
          <Button
            variant="action"
            size="icon"
            className="hover:bg-transparent hover:text-white/10"
          >
            <BarChart3 className="w-6 h-6" />
          </Button>
          <Button
            variant="action"
            size="icon"
            className="hover:bg-transparent hover:text-white/10"
          >
            <Search className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
