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
  const [lineState, setLineState] = useState(line);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const onWordContainerClick = (index: number) => {
    setSelectedWordIndex(index);
  };

  const onNextWord = (index: number) => {
    const nextIndex = index + 1;
    const nextWord = line.words?.[nextIndex];

    if (!nextWord) {
      createNewWord();
    }
    setSelectedWordIndex(nextIndex);
  };

  const createNewWord = () => {
    lineState.words.push({
      text: "",
    });
    setLineState({ ...lineState });
  };

  const onBlur = () => {
    setSelectedWordIndex(null);
  };

  return (
    <div className="whitespace-pre-line text-center leading-10">
      {lineState.words.map((word, i) => (
        <Word
          mode={selectedWordIndex === i ? WordModes.EDIT : WordModes.VIEW}
          word={word}
          key={`${i}-${word}`}
          onNextWord={onNextWord}
          index={i}
          onClick={onWordContainerClick}
          onBlur={onBlur}
        />
      ))}
    </div>
  );
}
