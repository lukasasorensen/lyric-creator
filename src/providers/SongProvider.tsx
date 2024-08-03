"use client";
import { ISongDb } from "@/interfaces/db/ISongDb";
import { ReactNode, createContext, useContext, useState } from "react";

export const SongContext = createContext<{
  song: ISongDb | null;
  setSong: (song: ISongDb) => void;
}>({
  song: null,
  setSong: (newSong: ISongDb) => {},
});

export function useSongContext() {
  const value = useContext(SongContext);
  return value;
}

export function SongProvider({ children }: { children: ReactNode }) {
  const [song, setSong] = useState<ISongDb | null>(null);

  const value = {
    song,
    setSong: setSong,
  };

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}
