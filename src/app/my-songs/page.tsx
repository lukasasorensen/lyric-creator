"use client";
import { createSong, getSongs } from "@/clients/songClient";
import { CirclePlusButton } from "@/components/common/CirclePlusButton";
import SongSelector from "@/components/views/SongSelector/SongSelector";
import defaultNewSong from "@/constants/defaultNewSong";
import { ISongDb } from "@/interfaces/db/ISongDb";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { useSession } from "next-auth/react";

export default function SongListView() {
  const router = useRouter();
  const [songs, setSongs] = useState<ISongDb[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  const addNewSong = async () => {
    try {
      setIsLoading(true);
      const { insertedId } = await createSong(defaultNewSong);
      router.push(`/my-songs/${insertedId}`);
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

  if (status !== "authenticated") {
    return (
      <div className="flex h-60 max-h-full w-full flex-col justify-center text-center">
        <h1 className={`${tw.TEXT_SECONDARY} mb-5 text-2xl font-bold`}>No Songs Found</h1>
        <h2>
          Please{" "}
          <a className={`${tw.TEXT_TERTIARY} underline`} href="/login">
            Sign In
          </a>{" "}
          to view your songs.
        </h2>
      </div>
    );
  }

  return (
    <main className="song-container flex w-full flex-col justify-center">
      <h1 className={`mb-10 text-center text-4xl font-bold ${tw.TEXT_SECONDARY}`}>
        Your Songs
      </h1>
      <div className="flex w-full justify-center">
        <SongSelector isLoading={isLoading} songs={songs} />
        {!isLoading && !songs?.length && <h1>No Song Found</h1>}
      </div>
      <div className="container mt-8 flex justify-center">
        <CirclePlusButton onClick={addNewSong} />
      </div>
    </main>
  );
}
