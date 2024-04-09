"use client"

import { ILyrics } from "@/interfaces/Lyrics";
import { useState } from "react";

export default function LyricEditor({ lyrics }: { lyrics: ILyrics }) {
  const getSectionTitle = (title: string, isRepeated: boolean) => {
    return isRepeated ? `[${title}]` : title;
  }
  return (
    <div className="lyric-editor-container w-full max-w-96 p-25">
      <h2 className="text-black text-2xl font-bold text-center">{lyrics.title}</h2>
      {lyrics?.order?.length && lyrics.order.map((lyricSection, i) => {
        const section = lyrics?.sections?.[lyricSection?.sectionName];
        if (!section) return null;

        return (
          <div className="lyric-section" key={i}>
            <h3 className="text-black text-lg font-bold text-center mt-5 mb-3">{getSectionTitle(section.title, !!lyricSection.isRepeated)}</h3>
            {!lyricSection?.isRepeated && <p className="text-black whitespace-pre-line text-center leading-10">{section?.words ?? ''}</p>}
          </div>
        );
      })}
    </div>
  );
}
