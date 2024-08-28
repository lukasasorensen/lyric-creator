import { IChord, IWord } from "@/interfaces/db/ISongDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import ChordSelector from "../views/ChordSelctor/ChordSelector";
import { useState } from "react";

export interface IWordProps {
  word: IWord;
  index?: number;
  edit?: boolean;
  onChordChange?: (word: IWord) => void;
}

export default function Word(props: IWordProps) {
  if (!props.edit) return <WordInner word={props.word} />;

  const onChordSelect = (chord: IChord) => {
    props.word.chord = chord;
    props.onChordChange?.(props.word);
  };

  return (
    <Popover className={`inline-block`}>
      {({ open, close }) => (
        <>
          <PopoverButton>
            <WordInner word={props.word} isSelected={open} />
          </PopoverButton>
          <PopoverPanel
            anchor="top"
            className={`flex justify-center p-8 ${tw.BG_SECONDARY} rounded-md border-2 border-slate-300 dark:border-slate-600`}
          >
            <div className="flex flex-col text-center">
              <h1 className={`${tw.TEXT_SECONDARY} mb-5 text-xl font-bold`}>
                Select Chord
              </h1>
              <ChordSelector
                onSelect={(chord) => {
                  onChordSelect(chord);
                  close();
                }}
                selectedChord={props.word?.chord}
              />
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}

export function WordInner({ word, isSelected }: { word: IWord; isSelected?: boolean }) {
  return (
    <div className="word-container inline-block">
      {!isSelected && !!word?.chord?.letter && (
        <div className={`${tw.TEXT_SECONDARY} word-chord -mb-1 font-bold leading-3`}>
          {word?.chord?.letter}
        </div>
      )}
      <div className={`word ${tw.TEXT_PRIMARY} ${isSelected && 'selected'}`}>{word.text} </div>
    </div>
  );
}
