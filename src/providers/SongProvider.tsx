"use client";
import { ISongDb } from "@/interfaces/db/ISongDb";
import { ReactNode, createContext, useReducer } from "react";

export const SongContext = createContext(null);
export const SongDispatchContext = createContext(null);

export default function SongProvider({ children }: { children: ReactNode }) {
  const [song, dispatch] = useReducer(songReducer, {} as ISongDb);

  return (
    <SongContext.Provider value={song}>
      <SongDispatchContext.Provider value={dispatch}>
        {children}
      </SongDispatchContext.Provider>
    </SongContext.Provider>
  );
}

function songReducer(song: ISongDb, action: any) {
  switch (action.type) {
    case "updateSectionByName": {
      if (song.sections[action.sectionName]) {
        song.sections[action.sectionName] = action.section;
      }

      return song;
    }
  }
}
