"use client";

import { ILyricsUi } from "@/interfaces/ui/ILyricsUi";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import LyricsList from "./LyricList";

export interface ILyricSelectorProps {
  lyrics: ILyricsUi[];
}

export default function LyricSelector(props: ILyricSelectorProps) {
  

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-around ${tw.BG_PRIMARY} p-24`}
    >
      <h1
        className={`mb-10 text-center text-4xl font-bold ${tw.TEXT_SECONDARY}`}
      >
        Lyric Creator
      </h1>
      <div
        className={`lyrics-editor-outer-container container mx-auto flex flex-col justify-center rounded-2xl ${tw.BG_SECONDARY} py-10`}
      >
        <LyricsList lyricsResults={props.lyrics} />
      </div>
    </div>
  );
}
