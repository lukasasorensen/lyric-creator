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
  if (!props.edit) return <WordInner {...props} />;

  const onChordSelect = (note: string) => {
    console.log(note);
    props.word.chord ??= {} as IChord;
    props.word.chord.letter = note;
    props.onChordChange?.(props.word);
  };

  return (
    <Popover className={`inline-block`}>
      <PopoverButton>
        <WordInner {...props} />
      </PopoverButton>
      <PopoverPanel
        anchor="top"
        className={`flex justify-center p-8 ${tw.BG_SECONDARY} rounded-md border-2 border-slate-300 dark:border-violet-600`}
      >
        <ChordSelector onSelect={onChordSelect} />
      </PopoverPanel>
    </Popover>
  );
}

export function WordInner({ word }: IWordProps) {
  return (
    <div className="word-container inline-block">
      {!!word?.chord?.letter && (
        <div className={`${tw.TEXT_SECONDARY} word-chord -mb-1 font-bold leading-3`}>
          {word.chord.letter}
          {word.chord.extension}
        </div>
      )}
      <div className={`word ${tw.TEXT_PRIMARY}`}>{word.text} </div>
    </div>
  );
}
