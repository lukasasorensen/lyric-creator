"use client";
import { getLyricById, getLyrics } from "@/clients/lyricClient";
import LyricEditor from "@/components/views/LyricEditor/LyricEditor";
import { ILyricsUi } from "@/interfaces/ui/ILyricsUi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LyricEditorView() {
  const params = useParams();
  const lyricId = params?.id as string;
  const [lyrics, setLyrics] = useState({} as ILyricsUi)<ILyricsUi>;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const getLyrics: ILyricsUi = await getLyricById(lyricId);
      setLyrics(getLyrics);
      setIsLoading(false);
    };

    init();
  }, [lyricId, setLyrics]);

  // todo loading component
  if (isLoading) return <h1>Loading</h1>;
  if (!lyrics?._id?.length) return <h1>Not Found</h1>;

  return (
    <main className="lyrics-container">
      {lyrics?._id && <LyricEditor lyrics={lyrics} />}
    </main>
  );
}