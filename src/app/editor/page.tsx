"use client";
import { getSongs } from "@/clients/songClient";
import SongSelector from "@/components/views/SongSelector/SongSelector";
import { ISongDb } from "@/interfaces/db/ISongDb";
import { useEffect, useState } from "react";

export default function SongListView() {
  const [songs, setSongs] = useState<ISongDb[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const allSong: ISongDb[] = await getSongs();
      setSongs(allSong);
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <main className="song-container flex w-full justify-center">
      <SongSelector isLoading={isLoading} songs={songs} />
      {!isLoading && !songs?.length && <h1>No Song Found</h1>}
    </main>
  );
}
