"use client";
import { ILyricsDb } from "@/interfaces/db/ILyricsDb";
import { ReactNode, createContext, useReducer } from "react";

export const LyricsContext = createContext(null);
export const LyricsDispatchContext = createContext(null);

export default function LyricsProvider({ children }: { children: ReactNode }) {
  const [lyrics, dispatch] = useReducer(lyricsReducer, {} as ILyricsDb);

  return (
    <LyricsContext.Provider value={lyrics}>
      <LyricsDispatchContext.Provider value={dispatch}>
        {children}
      </LyricsDispatchContext.Provider>
    </LyricsContext.Provider>
  );
}

function lyricsReducer(lyrics: ILyricsDb, action: any) {
  switch (action.type) {
    case "updateSectionByName": {
      if (lyrics.sections[action.sectionName]) {
        lyrics.sections[action.sectionName] = action.section;
      }

      return lyrics;
    }
  }
}
