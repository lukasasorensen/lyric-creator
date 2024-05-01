"use client";
import LyricEditor from "@/components/LyricEditor/index";
import { ThemedButton } from "@/components/Themed";
import { darkHallowLyrics } from "@/example-data/ExampleLyrics";
import { ILyrics } from "@/interfaces/Lyrics";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useState } from "react";

export default function Home() {
  const [lyrics, setLyrics] = useState<ILyrics | null>(darkHallowLyrics);
  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-around bg-slate-700 p-24">
        <h1 className="mb-10 text-center text-4xl font-bold">Lyric Creator</h1>
        <div className="lyrics-editor-outer-container container mx-auto flex flex-col justify-center rounded-2xl bg-stone-800 py-10">
          <div className="container mb-10 flex w-full flex-row justify-center gap-5">
            <ThemedButton text="Edit" color="primary"></ThemedButton>
            <ThemedButton text="Switch Theme" color="secondary"></ThemedButton>
          </div>
          <div className="lyrics-container">
            {lyrics && <LyricEditor lyrics={lyrics} />}
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
