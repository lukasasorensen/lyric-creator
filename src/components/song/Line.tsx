"use client";
import { ILine } from "@/interfaces/db/ISongDb";
import Word from "@/components/song/Word";

export default function Line({ line, edit }: { line: ILine; edit?: boolean }) {
  return (
    <div className="whitespace-pre-line text-center leading-10">
      {line.words.map((word, i) => (
        <Word word={word} key={`${i}-${word}`} index={i} edit={edit} />
      ))}
    </div>
  );
}
