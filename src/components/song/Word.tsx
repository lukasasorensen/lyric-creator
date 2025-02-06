import { IChord, IWord } from "@/interfaces/db/ISongDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useSongContext } from "@/providers/SongProvider";
import { ChordSelector } from "@/components/ChordSelector";
import useMousePosition from "@/hooks/useMousePositon";
import { useRef, useState } from "react";
import useDrag from "@/hooks/useDrag";
import { max } from "lodash";

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
          <PopoverButton className="focus-visible:outline-none">
            <WordInner
              onChordChange={props.onChordChange}
              word={props.word}
              isSelected={open}
            />
          </PopoverButton>
          <PopoverPanel
            anchor="top"
            className={`flex justify-center p-4 ${tw.BG_SECONDARY} z-20 rounded-md border-2 border-slate-300 dark:border-slate-600`}
          >
            <div className="flex flex-col text-center">
              <ChordSelector
                showSuggestions={true}
                songKey={song?.key ? { ...song.key } : undefined}
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

export function WordInner({
  word,
  isSelected,
  onChordChange,
}: {
  word: IWord;
  isSelected?: boolean;
  onChordChange: (word: IWord) => void;
}) {
  const chordRef = useRef<HTMLDivElement>(null);

  const [translate, setTranslate] = useState({ x: word.chord?.offset ?? 0, y: 0 });

  const handleDrag = (e: MouseEvent) => {
    if (!word?.chord) return;
    const maxOffset = (chordRef.current?.clientWidth ?? 10) / 2;
    word.chord.offset ??= 0;
    translate.x += e.movementX;
    if (translate.x > maxOffset) translate.x = maxOffset;
    if (translate.x < maxOffset * -1) translate.x = maxOffset * -1;
    translate.y += e.movementY;
    setTranslate({ ...translate });
    word.chord.offset = translate.x;
    console.log("handleDrag", word.chord.offset);
    onChordChange(word);
  };

  const drag = useDrag(chordRef, [translate], {
    onDrag: handleDrag,
  });

  return (
    <div className={`word-container inline-block ${isSelected && "selected"}`}>
      {!!word?.chord?.letter && (
        <div
          ref={chordRef}
          className={`${tw.TEXT_SECONDARY} word-chord -mb-1 cursor-col-resize pt-2 font-bold leading-3 ${drag.isDragging ? "text-2xl" : ""}`}
          style={{ transform: `translateX(${translate.x}px)` }}
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
