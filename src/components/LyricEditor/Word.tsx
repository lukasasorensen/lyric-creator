"use client";
import { IWord } from "@/interfaces/Lyrics";
import { useThemeContext } from "@/providers/ThemeProvider";
import keyboardKey from "keyboard-key";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export interface IWordProps {
  word: IWord;
  mode: WordModes;
  index: number;
  onWordChange?: (word: IWord) => void;
  onNextWord?: (index: number) => void;
  onBlur?: () => void;
  onClick?: (index: number) => void;
}

export enum WordModes {
  EDIT = "edit",
  VIEW = "view",
  READONLY = "readonly",
}

export default function Word({
  word,
  mode,
  index,
  onWordChange,
  onNextWord,
  onClick,
  onBlur,
}: IWordProps) {
  const [wordState, setWord] = useState(word);

  const onWordTextChange = (text: string) => {
    wordState.text = text;
    setWord({ ...wordState });
    onWordChange?.(wordState);
  };

  const onWordEditBlur = () => {
    onBlur?.();
  };

  const goToNextWord = () => {
    onNextWord?.(index);
  };

  const onWordContainerDoubleClick = () => {
    if (mode === WordModes.READONLY) return;
    wordState.text = "";
    setWord({ ...wordState });
    onClick?.(index);
  };

  return (
    <div
      className="word-container inline-block"
      onClick={() => onClick?.(index)}
      onDoubleClick={onWordContainerDoubleClick}
    >
      {(mode === WordModes.VIEW || mode === WordModes.READONLY) && (
        <WordView word={wordState} />
      )}
      {mode === WordModes.EDIT && (
        <WordEdit
          initialWord={wordState}
          onTextChange={onWordTextChange}
          onBlur={onWordEditBlur}
          goToNextWord={goToNextWord}
        />
      )}
    </div>
  );
}

function WordView({ word }: { word: IWord }) {
  const { twColorClasses} = useThemeContext()
  return <div className={`word ${twColorClasses.TEXT_PRIMARY}`}>{word.text} </div>;
}

function WordEdit({
  initialWord,
  onTextChange,
  onBlur,
  goToNextWord,
}: {
  initialWord: IWord;
  onTextChange: (text: string) => void;
  onBlur: () => void;
  goToNextWord: () => void;
}) {
  const containerRef = useRef(null);
  const [word, setWord] = useState(initialWord);
  const changeWordText = (text: string) => {
    word.text = text;
    setWord({ ...word });
    onTextChange(text);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    e?.preventDefault();

    if (!e?.key?.length) return;

    if (e.key.length === 1) {
      // handle single keypress
      word.text += e.key;
      changeWordText(word.text);
    }

    const keyCode = keyboardKey.getCode(e);

    switch (keyCode) {
      case keyboardKey.Spacebar:
      case keyboardKey.Enter:
        goToNextWord();
        break;
      case keyboardKey.Escape: // 27
        onBlur();
        break;
      case keyboardKey.Backspace:
        word.text = word.text.slice(0, -1);
        changeWordText(word.text);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    containerRef?.current?.focus?.();
  }, []);

  return (
    <div
      ref={containerRef}
      className="word word-input"
      onKeyDown={onKeyDown}
      onInput={(e) => onTextChange(e.currentTarget.textContent ?? "")}
      tabIndex={0}
      onBlur={onBlur}
    >
      {word.text}
      <span className="text-cursor">|</span>
    </div>
  );
}
