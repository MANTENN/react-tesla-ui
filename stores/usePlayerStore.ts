"use client";
import { create } from "zustand";

type Source = "Spotify" | "Youtube" | "Apple Music" | "Tidal" | "Deezer";

type Song = {
  title: string;
  artist: string;
  album: string;
};

type PlayerState = {
  isPlaying: boolean;
  source: Source | null;
  playlist: Song[];
  setIsPlaying: (isPlaying: boolean) => void;
  setSource: (source: Source) => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  source: null,
  setSource: (source: Source) => set({ source }),
  playlist: [
    { title: "Твій на 100%", artist: "Boombox", album: "Boombox" },
    {
      title: "Майбутність (feat. KALUSH)",
      artist: "Артем Пивоваров",
      album: "Майбутність (feat. KALUSH)",
    },
    {
      title: "Save my mind",
      artist: "Santorin",
      album: "Save my mind",
    },
  ],
  setPlaylist: (playlist: Song[]) => set({ playlist }),
}));
