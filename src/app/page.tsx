'use client'
import LyricEditor from "@/components/LyricEditor/index";
import { darkHallowLyrics } from "@/example-data/ExampleLyrics";
import { ILyrics } from "@/interfaces/Lyrics";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [lyrics, setLyrics] = useState<ILyrics | null>(darkHallowLyrics);
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24 bg-slate-700">
      <h1 className="text-center text-4xl font-bold mb-10">Lyric Creator</h1>
      <div className="lyrics-editor-outer-container container mx-auto bg-stone-800 flex justify-center py-10 rounded-2xl">
        {lyrics && <LyricEditor lyrics={lyrics} />}
      </div>
    </main>
  );
}
