import { IChord, IWord } from "@/interfaces/db/ISongDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import ChordSelector from "../views/ChordSelctor/ChordSelector";

export interface IWordProps {
  word: IWord;
  index?: number;
  edit?: boolean;
  onChordChange?: (word: IWord) => void;
}

export default function Word(props: IWordProps) {
  if (!props.edit) return <WordInner word={props.word} />;

  const onChordSelect = (note: string) => {
    console.log(note);
    props.word.chord ??= {} as IChord;
    props.word.chord.letter = note;
    props.onChordChange?.(props.word);
  };

  return (
    <Popover className={`inline-block`}>
      {({ open, close }) => (
        <>
          <PopoverButton>
            <WordInner word={props.word} showChord={!open} />
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
                onSelect={(note) => {
                  onChordSelect(note);
                  close();
                }}
              />
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}

export function WordInner({ word, showChord }: { word: IWord; showChord?: boolean }) {
  return (
    <div className="word-container inline-block">
      {showChord && !!word?.chord?.letter && (
        <div className={`${tw.TEXT_SECONDARY} word-chord -mb-1 font-bold leading-3`}>
          {word.chord.letter}
          {word.chord.extension}
        </div>
      )}
      <div className={`word ${tw.TEXT_PRIMARY}`}>{word.text} </div>
    </div>
  );
}
