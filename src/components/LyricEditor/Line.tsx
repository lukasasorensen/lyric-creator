"use client";
import { ILine } from "@/interfaces/Lyrics";
import Word, { WordModes } from "./Word";
import { useState } from "react";

export default function Line({
  line,
  onNextLine,
}: {
  line: ILine;
  onNextLine?: () => void;
}) {
  return (
    <div className="whitespace-pre-line text-center leading-10">
      {line.words.map((word, i) => (
        <Word mode={WordModes.VIEW} word={word} key={`${i}-${word}`} index={i} />
      ))}
    </div>
  );
}
