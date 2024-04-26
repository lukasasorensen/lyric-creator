"use client";
import { ILine } from "@/interfaces/Lyrics";
import Word from "./Word";

export default function Line({ line }: { line: ILine }) {
  return (
    <div className="whitespace-pre-line text-center leading-10 text-white">
      {line.words.map((word, i) => (
        <Word word={word} key={`${i}-${word}`} />
      ))}
    </div>
  );
}
