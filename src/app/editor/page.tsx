"use client";
import { getLyrics } from "@/clients/lyricClient";
import LyricSelector from "@/components/views/LyricSelector/LyricSelector";
import { ILyricsDb } from "@/interfaces/db/ILyricsDb";
import { useEffect, useState } from "react";

export default function LyricEditorSelector() {
  const [songs, setSongs] = useState<ILyricsDb[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const allLyrics: ILyricsDb[] = await getLyrics();
      setSongs(allLyrics);
      setIsLoading(false);
    };

    init();
  });

  return (
    <main className="lyrics-container flex w-full justify-center">
      <LyricSelector isLoading={isLoading} songs={songs} />
      {!isLoading && !songs?.length && <h1>No Lyrics Found</h1>}
    </main>
  );
}
