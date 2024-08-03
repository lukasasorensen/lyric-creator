"use client";
import SongEditor from "@/components/views/SongEditor/SongEditor";
import { SongProvider } from "@/providers/SongProvider";
import { useParams } from "next/navigation";

export default function SongEditorView() {
  const params = useParams();
  const songId = params?.id as string;

  return (
    <main className="song-container w-full">
      <SongProvider>
        <SongEditor songId={songId} />
      </SongProvider>
    </main>
  );
}
