"use client";
import { createSong, getSongs } from "@/clients/songClient";
import { CirclePlusButton } from "@/components/common/CirclePlusButton";
import SongSelector from "@/components/views/SongSelector/SongSelector";
import defaultNewSong from "@/constants/defaultNewSong";
import { ISongDb } from "@/interfaces/db/ISongDb";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SongListView() {
  const router = useRouter();
  const [songs, setSongs] = useState<ISongDb[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addNewSong = async () => {
    try {
      setIsLoading(true);
      const { insertedId } = await createSong(defaultNewSong);
      router.push(`/editor/${insertedId}`);
    } catch (error) {
      // todo fix
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getAllSongs = async () => {
    const allSong: ISongDb[] = await getSongs();
    setSongs(allSong);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllSongs();
  }, []);

  return (
    <main className="song-container flex w-full flex-col justify-center">
      <div className="flex w-full justify-center">
        <SongSelector isLoading={isLoading} songs={songs} />
        {!isLoading && !songs?.length && <h1>No Song Found</h1>}
      </div>
      <div className="container mt-14 flex justify-center">
        <CirclePlusButton onClick={addNewSong} />
      </div>
    </main>
  );
}
