"use client";
import SongEditor from "@/components/views/SongEditor/SongEditor";
import { SongProvider } from "@/providers/SongProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function SongEditorView() {
  const params = useParams();
  const songId = params?.id as string;

  return (
    <main className="song-container w-full">
      <Link href="/my-songs">
        <div className="cursor-pointer p-5">
          <FaArrowLeft size={22} className={`${tw.TEXT_TERTIARY}`} />
        </div>
      </Link>
      <h1 className={`-mt-12 mb-10 text-center text-4xl font-bold ${tw.TEXT_SECONDARY}`}>
        Edit Song
      </h1>
      <SongProvider>
        <SongEditor songId={songId} />
      </SongProvider>
    </main>
  );
}
