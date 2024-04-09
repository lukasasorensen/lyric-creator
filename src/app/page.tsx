'use client'
import LyricEditor from "@/components/LyricEditor";
import { darkHallowLyrics } from "@/example-data/ExampleLyrics";
import { ILyrics } from "@/interfaces/Lyrics";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [lyrics, setLyrics] = useState<ILyrics | null>(darkHallowLyrics);
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24 bg-slate-700">
      <h1 className="text-center text-4xl font-bold">Lyric Creator</h1>
      <div className="lyrics-editor-outer-container container mx-auto bg-white flex justify-center py-10">
        {lyrics && <LyricEditor lyrics={darkHallowLyrics} />}
      </div>
    </main>
  );
}
