"use client";
import { getLyricById, getLyrics } from "@/clients/lyricClient";
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

  // todo loading component
  if (isLoading) return <h1>Loading</h1>;
  if (!lyrics?._id?.length) throw new Error("No lyrics");

  return (
    <main className="lyrics-container">
      {lyrics?._id && <LyricEditor lyrics={lyrics} />}
    </main>
  );
}
