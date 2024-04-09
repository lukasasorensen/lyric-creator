"use client"

import { ILyrics } from "@/interfaces/Lyrics";
import { useState } from "react";

export default function LyricEditor({ lyrics }: { lyrics: ILyrics }) {
  return (
    <div className="lyric-editor-container w-full p-25">
      {lyrics?.order?.length && lyrics.order.map((lyricSection, i) => (
        <div className="lyric-section" key={i}>
          <h2 className="text-black text-lg font-bold">{lyricSection}</h2>
          <p className="text-black whitespace-pre-line">{lyrics?.sections?.[lyricSection]?.words ?? ''}</p>
        </div>
      ))}
    </div>
  );
}
