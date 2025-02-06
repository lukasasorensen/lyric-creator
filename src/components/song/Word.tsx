import { IChord, IWord } from "@/interfaces/db/ISongDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useSongContext } from "@/providers/SongProvider";
import { ChordSelector } from "@/components/ChordSelector";
import { useRef, useState } from "react";
import useDrag from "@/hooks/useDrag";

export interface IWordProps {
  word: IWord;
  index?: number;
  edit?: boolean;
  onChordChange?: (word: IWord) => void;
  onMoveChordToNextWord?: (word: IWord) => void;
  onMoveChordToPrevWord?: (word: IWord) => void;
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
              onMoveChordToNextWord={props.onMoveChordToNextWord}
              onMoveChordToPrevWord={props.onMoveChordToPrevWord}
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
  onMoveChordToNextWord,
  onMoveChordToPrevWord,
}: {
  word: IWord;
  isSelected?: boolean;
  onChordChange?: (word: IWord) => void;
  onMoveChordToNextWord?: (word: IWord) => void;
  onMoveChordToPrevWord?: (word: IWord) => void;
}) {
  return (
    <div
      className={`word-container inline-block ${isSelected && "selected"} cursor-col-resize`}
    >
      {!!word?.chord?.letter && (
        <DraggableChord
          word={word}
          onChordChange={onChordChange}
          onMoveChordToNextWord={onMoveChordToNextWord}
          onMoveChordToPrevWord={onMoveChordToPrevWord}
        />
      )}
      <div className={`word ${tw.TEXT_PRIMARY}`}>{word.text} </div>
    </div>
  );
}

export function DraggableChord({
  word,
  onChordChange,
  onMoveChordToNextWord,
  onMoveChordToPrevWord,
}: {
  word: IWord;
  onChordChange?: (word: IWord) => void;
  onMoveChordToNextWord?: (word: IWord) => void;
  onMoveChordToPrevWord?: (word: IWord) => void;
}) {
  const chordRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: word.chord?.offset ?? 0, y: 0 });
  const [isOutsideOfContainer, setIsOutsideOfContainer] = useState(false);

  const handleDrag = (e: MouseEvent) => {
    console.log("handleDrag");
    if (!word?.chord) return;
    const maxOffset = (chordRef.current?.clientWidth ?? 10) / 1.75;
    translate.x += e.movementX;
    translate.y += e.movementY;

    // boundaries
    if (translate.x > maxOffset) {
      // translate.x = maxOffset;
      setIsOutsideOfContainer(true);
      //onMoveChordToNextWord?.(word);
    } else if (translate.x < maxOffset * -1) {
      // translate.x = maxOffset * -1;
      setIsOutsideOfContainer(true);
      // onMoveChordToPrevWord?.(word);
    } else {
      setIsOutsideOfContainer(false);
    }

    // chord may have been removed from onMovechordTo<Next/Prev>Word
    // todo probably fix this side-effect
    if (!word.chord) return;

    word.chord.offset ??= 0;
    word.chord.offset = translate.x;

    setTranslate({ ...translate });
    onChordChange?.(word);
  };

  const handleOnPointerUp = (e: MouseEvent) => {
    const elementUnderPoint = document.elementFromPoint(e.clientX, e.clientY);
    if (!elementUnderPoint?.classList.contains("word")) return;
  };

  //const drag = useDrag(chordRef, [translate], {
  //  onDrag: handleDrag,
  //  onPointerUp: handleOnPointerUp
  //});

  return (
    <div
      ref={chordRef}
      className={`${tw.TEXT_SECONDARY} word-chord -mb-1 cursor-col-resize pt-2 font-bold leading-3 ${drag.isDragging ? "pointer-events-none text-4xl" : ""}`}
      style={{
        transform: `translateX(${translate.x}px) ${isOutsideOfContainer ? `translateY(${translate.y}px)` : ""}`,
      }}
    >
      {word?.chord?.letter}
      {word?.chord?.quality}
      {word?.chord?.extensions?.join("")}
    </div>
  );
}
