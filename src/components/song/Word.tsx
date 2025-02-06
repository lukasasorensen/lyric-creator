import { IChord, IWord } from "@/interfaces/db/ISongDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useSongContext } from "@/providers/SongProvider";
import { ChordSelector } from "@/components/ChordSelector";

export interface IWordProps {
  word: IWord;
  index?: number;
  edit?: boolean;
  onChordChange?: (word: IWord) => void;
}

export default function Word(props: IWordProps) {
  const { song } = useSongContext();

  const onChordSelect = (chord: IChord) => {
    props.word.chord = chord;
    props.onChordChange?.(props.word);
  };

  if (!props.edit) return <WordInner word={props.word} />;

  return (
    <Popover className={`inline-block`}>
      {({ open, close }) => (
        <>
          <PopoverButton>
            <WordInner word={props.word} isSelected={open} />
          </PopoverButton>
          <PopoverPanel
            anchor="top"
            className={`flex justify-center p-4 ${tw.BG_SECONDARY} rounded-md border-2 border-slate-300 dark:border-slate-600`}
          >
            <div className="flex flex-col text-center">
              <ChordSelector
                showSuggestions={true}
                songKey={song?.key ? { ...song.key } : undefined}
                showHorizontalShift={true}
                onSelect={(chord) => {
                  onChordSelect(chord);
                  close();
                }}
                onChordChange={(chord) => {
                  onChordSelect(chord);
                }}
                onDeleteChord={(emptyChord) => {
                  onChordSelect(emptyChord);
                }}
                initialChord={props.word?.chord}
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
    <div className={`word-container inline-block ${isSelected && "selected"}`}>
      {!!word?.chord?.letter && (
        <div
          className={`${tw.TEXT_SECONDARY} word-chord -mb-1 pt-2 font-bold leading-3`}
          style={{ transform: `translateX(${word?.chord?.offset ?? 0}%)` }}
        >
          {word?.chord?.letter}
          {word?.chord?.quality}
          {word?.chord?.extensions?.join("")}
        </div>
      )}
      <div className={`word ${tw.TEXT_PRIMARY} `}>{word.text} </div>
    </div>
  );
}
