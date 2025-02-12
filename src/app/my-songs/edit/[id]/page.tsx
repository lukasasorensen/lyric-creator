"use client";
import SongEditor from "@/components/views/SongEditor/SongEditor";
import { SongProvider, useSongContext } from "@/providers/SongProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { useEffect, useState } from "react";
import { getSongById } from "@/clients/songClient";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { ISongDb } from "@/interfaces/db/ISongDb";

export default function SongEditorView() {
  const { setSong, song } = useSongContext();
  const params = useParams();
  const songId = params?.id as string;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!songId?.length) return;

    const init = async () => {
      const getSong: ISongDb = await getSongById(songId);
      setSong(getSong);
      setIsLoading(false);
    };

    init();
  }, [songId, setSong]);

  if (isLoading) {
    return <LoadingDisplay text="Loading..." />;
  }

  if (!isLoading && !song) {
    return <h1>Not Found 😔</h1>;
  }

  return (
    <main className="song-container w-full">
      <div className="absolute">
        <Link href="/my-songs">
          <button className="cursor-pointer p-5">
            <FaArrowLeft size={22} className={`${tw.TEXT_TERTIARY}`} />
          </button>
        </Link>
      </div>
      <SongEditor />
    </main>
  );
}
