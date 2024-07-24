"use client";
import { getLyrics } from "@/clients/lyricClient";
import LyricSelector from "@/components/views/LyricSelector/LyricSelector";
import { ILyricsDb } from "@/interfaces/db/ILyricsDb";
import { useEffect, useState } from "react";

export default function LyricEditorSelector() {
  const [lyricsList, setLyricsList] = useState<ILyricsDb[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const allLyrics: ILyricsDb[] = await getLyrics();
      setLyricsList(allLyrics);
      setIsLoading(false);
    };

    init();
  });

  return (
    <main className="lyrics-container flex w-full justify-center">
      <LyricSelector isLoading={isLoading} lyrics={lyricsList} />
      {!isLoading && !lyricsList?.length && <h1>No Lyrics Found</h1>}
    </main>
  );
}
