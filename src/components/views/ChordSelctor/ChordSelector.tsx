import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { NATURALS, SHARPS } from "@/constants/Notes";
import { IChord } from "@/interfaces/db/ISongDb";
export default function ChordSelector({
  onSelect,
  selectedChord
}: {
  onSelect: (note: string) => void;
  selectedChord?: Partial<IChord> | undefined
}) {
  return (
    <div className="chord-selector-container">
      <div className="chord-selector-sharps-container flex justify-between px-9">
        {SHARPS.map((note, i) => (
          <ChordSelectorItem
            className={i === 1 ? "mr-16" : ""}
            note={note}
            key={i + "-chord"}
            onClick={(note) => onSelect(note)}
            selected={selectedChord?.letter === note}
          />
        ))}
      </div>
      <div className="chord-selector-naturals-container flex justify-between">
        {NATURALS.map((note, i) => (
          <ChordSelectorItem
            note={note}
            key={i + "-chord"}
            onClick={(note) => onSelect(note)}
            selected={selectedChord?.letter === note}
          />
        ))}
      </div>
    </div>
  );
}

export function ChordSelectorItem({
  note,
  onClick,
  className,
  selected
}: {
  note: string;
  className?: string;
  onClick: (note: string) => void;
  selected?: boolean;
}) {
  return (
    <button
      className={`chord-selector-chord m-2 w-10 p-2 text-center ${tw.BTN_PRIMARY_BORDER} rounded-md ${className} ${!!selected && 'bg-violet-700'}`}
      onClick={() => onClick(note)}
    >
      {note}
    </button>
  );
}
