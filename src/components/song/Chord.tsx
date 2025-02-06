import { IChord } from "@/interfaces/db/ISongDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useSongContext } from "@/providers/SongProvider";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { ChordSelector } from "@/components/ChordSelector";

export interface IChordProps {
  chord: IChord;
  index?: number;
  edit?: boolean;
  onChordChange?: (chord: IChord) => void;
}

export default function Chord(props: IChordProps) {
  const { song } = useSongContext();

  const onChordSelect = (chord: IChord) => {
    props.onChordChange?.(props.chord);
  };

  if (!props.edit) return <ChordView chord={props.chord} />;

  return (
    <Popover className={`inline-block`}>
      {({ open, close }) => (
        <>
          <PopoverButton>
            <ChordView chord={props.chord} isSelected={open} />
          </PopoverButton>
          <PopoverPanel
            anchor="top"
            className={`flex justify-center p-4 ${tw.BG_SECONDARY} rounded-md border-2 border-slate-300 dark:border-slate-600`}
          >
            <div className="flex flex-col text-center">
              <ChordSelector
                showSuggestions={true}
                showHorizontalShift={true}
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
                initialChord={props.chord}
              />
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}

export function ChordView({
  chord,
  isSelected,
}: {
  chord: IChord;
  isSelected?: boolean;
}) {
  const [isDeleteChordButtonShown, setIsDeleteChordButtonShown] = useState(false);
  const [isChordHighlighted, setIsChordHighlighted] = useState(false);

  const onMouseEnterChord = () => {
    setIsChordHighlighted(true);
    setIsDeleteChordButtonShown(true);
  };

  const onMouseLeaveChord = () => {
    setIsChordHighlighted(false);
    setIsDeleteChordButtonShown(false);
  };

  return (
    <div
      className={`chord-container inline-block ${isSelected && "selected"} ${isChordHighlighted ? "highlighted" : ""}`}
      onMouseEnter={() => onMouseEnterChord()}
      onMouseLeave={() => onMouseLeaveChord()}
    >
      <div
        className={`${tw.TEXT_SECONDARY}  word-chord cursor-pointer px-2 py-2 text-xl font-bold leading-3`}
      >
        {chord?.letter}
        {chord?.quality}
        {chord?.extensions?.join("")}
      </div>
      <div
        className={`${isDeleteChordButtonShown ? "relative z-10 float-right -mr-2 -mt-9 opacity-100 transition-opacity" : "opacity-0"}`}
      >
        <div className={`rounded-full p-1 ${tw.BTN_DANGER}`}>
          <FaMinus size={10} />
        </div>
      </div>
    </div>
  );
}
