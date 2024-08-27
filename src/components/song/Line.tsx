"use client";
import { ILine } from "@/interfaces/db/ISongDb";
import Word from "@/components/song/Word";

export default function Line({ line }: { line: ILine }) {
  return (
    <div className="whitespace-pre-line text-center leading-10">
      {line.words.map((word, i) => (
        <Word word={word} key={`${i}-${word}`} index={i} />
      ))}
    </div>
  );
}
