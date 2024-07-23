"use client";

import { ILyricsUi } from "@/interfaces/ui/ILyricsUi";
import { useThemeContext } from "@/providers/ThemeProvider";
import LyricsList from "./LyricList";

export interface ILyricSelectorProps {
  lyrics: ILyricsUi;
}

export default function LyricSelector(props: ILyricSelectorProps) {
  const { twColorClasses } = useThemeContext();

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}
    >
      <h1
        className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}
      >
        Lyric Creator
      </h1>
      <div
        className={`lyrics-editor-outer-container container mx-auto flex flex-col justify-center rounded-2xl ${twColorClasses.BG_SECONDARY} py-10`}
      >
        <LyricsList lyricsResults={props.lyrics} />
      </div>
    </div>
  );
}
