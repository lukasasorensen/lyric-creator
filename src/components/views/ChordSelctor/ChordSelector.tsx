import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { NATURALS, SHARPS } from "@/constants/Notes";
export default function ChordSelector({
  onSelect,
}: {
  onSelect: (note: string) => void;
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
          />
        ))}
      </div>
      <div className="chord-selector-naturals-container flex justify-between">
        {NATURALS.map((note, i) => (
          <ChordSelectorItem
            note={note}
            key={i + "-chord"}
            onClick={(note) => onSelect(note)}
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
}: {
  note: string;
  className?: string;
  onClick: (note: string) => void;
}) {
  return (
    <button
      className={`chord-selector-chord m-2 w-10 p-2 text-center ${tw.BTN_PRIMARY} rounded-md ${className}`}
      onClick={() => onClick(note)}
    >
      {note}
    </button>
  );
}
