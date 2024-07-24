"use client";
import { getLyricById, getLyrics } from "@/clients/lyricClient";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import LyricEditor from "@/components/views/LyricEditor/LyricEditor";
import { ILyricsDb } from "@/interfaces/db/ILyricsDb";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LyricEditorView() {
  const params = useParams();
  const lyricId = params?.id as string;
  const [lyrics, setLyrics] = useState({} as ILyricsDb);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const getLyrics: ILyricsDb = await getLyricById(lyricId);
      setLyrics(getLyrics);
      setIsLoading(false);
    };

    init();
  }, [lyricId, setLyrics]);

  if (isLoading) {
    return <LoadingDisplay text="Loading..." />
  }

  return (
    <main className="lyrics-container w-full">
      <LyricEditor lyrics={lyrics}  />
      {!isLoading && !lyrics && <h1>No Lyrics Found</h1>}
    </main>
  );
}
