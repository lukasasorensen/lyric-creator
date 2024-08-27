"use client";
import { IWord } from "@/interfaces/db/ISongDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export interface IWordProps {
  word: IWord;
  index: number;
}

export default function Word({ word }: IWordProps) {
  return (
    <div className="word-container inline-block">
      <div className={`word ${tw.TEXT_PRIMARY}`}>{word.text} </div>
    </div>
  );
}
