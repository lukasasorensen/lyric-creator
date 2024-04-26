"use client";
import { IWord } from "@/interfaces/Lyrics";
import keyboardKey from "keyboard-key";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

export interface IWordProps {
  word: IWord;
  onWordChange?: (word: IWord) => void;
  onNextWord?: () => void;
}

export enum WordModes {
  EDIT = "edit",
  VIEW = "view",
  READONLY = "readonly",
}

export default function Word({ word, onWordChange, onNextWord }: IWordProps) {
  const [mode, setMode] = useState(WordModes.VIEW);
  const [wordState, setWord] = useState(word);

  const onWordContainerClick = () => {
    if (mode === WordModes.READONLY) return;
    if (mode === WordModes.VIEW) setMode(WordModes.EDIT);
  };

  const onWordContainerDoubleClick = () => {
    if (mode === WordModes.READONLY) return;
    if (mode === WordModes.VIEW) setMode(WordModes.EDIT);
    wordState.text = "";
    setWord({ ...wordState });
  };

  const onWordTextChange = (text: string) => {
    wordState.text = text;
    setWord({ ...wordState });
    onWordChange?.(wordState);
  };

  const onBlur = () => {
    setMode(WordModes.VIEW);
  };

  const goToNextWord = () => {
    setMode(WordModes.VIEW);
    onNextWord?.();
  };

  return (
    <div
      className="word-container inline-block"
      onClick={onWordContainerClick}
      onDoubleClick={onWordContainerDoubleClick}
    >
      {(mode === WordModes.VIEW || mode === WordModes.READONLY) && <WordView word={wordState} />}
      {mode === WordModes.EDIT && (
        <WordEdit
          initialWord={wordState}
          onTextChange={onWordTextChange}
          onBlur={onBlur}
          goToNextWord={goToNextWord}
        />
      )}
    </div>
  );
}

function WordView({ word }: { word: IWord }) {
  return <div className="word">{word.text} </div>;
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
