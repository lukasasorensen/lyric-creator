"use client";
import LyricEditor from "@/components/LyricEditor/index";
import { ThemedButton } from "@/components/Themed";
import { darkHallowLyrics } from "@/example-data/ExampleLyrics";
import { ILyrics } from "@/interfaces/Lyrics";
import { useThemeContext } from "@/providers/ThemeProvider";
import { useState } from "react";

export default function Editor() {
  const [lyrics, setLyrics] = useState<ILyrics | null>(darkHallowLyrics);
  const [mode, setMode] = useState<"edit" | "view">("view");
  const { twColorClasses } = useThemeContext();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}
    >
      <h1 className="mb-10 text-center text-4xl font-bold">Lyric Creator</h1>
      <div
        className={`lyrics-editor-outer-container container mx-auto flex flex-col justify-center rounded-2xl ${twColorClasses.BG_SECONDARY} py-10`}
      >
        <div className="container mb-10 flex w-full flex-row justify-center gap-5">
          {mode === "edit" && (
            <ThemedButton
              text="Done"
              color="primary"
              onClick={() => setMode("view")}
            ></ThemedButton>
          )}
          {mode === "view" && (
            <ThemedButton
              text="Edit"
              color="primary"
              onClick={() => setMode("edit")}
            ></ThemedButton>
          )}
        </div>
        <div className="lyrics-container">
          {lyrics && <LyricEditor lyrics={lyrics} />}
        </div>
      </div>
    </main>
  );
}
