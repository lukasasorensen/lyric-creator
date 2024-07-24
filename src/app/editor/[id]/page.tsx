"use client";
import { getSongById, getSong } from "@/clients/songClient";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import SongEditor from "@/components/views/SongEditor/SongEditor";
import { ISongDb } from "@/interfaces/db/ISongDb";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SongEditorView() {
  const params = useParams();
  const songId = params?.id as string;
  const [song, setSong] = useState({} as ISongDb);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const getSong: ISongDb = await getSongById(songId);
      setSong(getSong);
      setIsLoading(false);
    };

    init();
  }, [songId, setSong]);

  if (isLoading) {
    return <LoadingDisplay text="Loading..." />
  }

  return (
    <main className="song-container w-full">
      <SongEditor song={song}  />
      {!isLoading && !song && <h1>No Song Found</h1>}
    </main>
  );
}
