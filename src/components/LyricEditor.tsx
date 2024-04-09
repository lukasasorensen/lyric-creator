"use client"

import { ILyrics } from "@/interfaces/Lyrics";
import { useState } from "react";

export default function LyricEditor({ lyrics }: { lyrics: ILyrics }) {
  return (
    <div className="lyric-editor-container w-full max-w-96 p-25">
      <h2 className="text-black text-2xl font-bold text-center">{lyrics.title}</h2>
      {lyrics?.order?.length && lyrics.order.map((lyricSection, i) => (
        <div className="lyric-section" key={i}>
          <h3 className="text-black text-lg font-bold text-center mt-5">{lyrics?.sections?.[lyricSection]?.title ?? ''}</h3>
          <p className="text-black whitespace-pre-line">{lyrics?.sections?.[lyricSection]?.words ?? ''}</p>
        </div>
      ))}
    </div>
  );
}
