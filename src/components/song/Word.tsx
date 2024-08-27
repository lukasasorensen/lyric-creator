import { IWord } from "@/interfaces/db/ISongDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import ChordSelector from "../views/ChordSelctor/ChordSelector";

export interface IWordProps {
  word: IWord;
  index?: number;
  edit?: boolean;
}

export default function Word(props: IWordProps) {
  if (!props.edit) return <WordInner {...props} />;

  const onChordSelect = (note: string) => {
    console.log(note);
  };

  return (
    <Popover className={`inline-block`}>
      <PopoverButton>
        <WordInner {...props} />
      </PopoverButton>
      <PopoverPanel
        anchor="top center"
        className={`flex justify-center p-8 ${tw.BG_SECONDARY} rounded-md border-2 border-slate-300 dark:border-violet-600`}
      >
        <ChordSelector onSelect={onChordSelect} />
      </PopoverPanel>
    </Popover>
  );
}

export function WordInner({ word, edit }: IWordProps) {
  return (
    <div className="word-container inline-block">
      <div className={`word ${tw.TEXT_PRIMARY}`}>{word.text} </div>
    </div>
  );
}
