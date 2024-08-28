import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { NATURALS, SHARPS } from "@/constants/Notes";
import { IChord } from "@/interfaces/db/ISongDb";
import { useState } from "react";
export default function ChordSelector({
  onSelect,
  selectedChord,
}: {
  onSelect: (chord: IChord) => void;
  selectedChord?: Partial<IChord> | undefined;
}) {
  const [selectedQuality, setSelectedQuality] = useState(selectedChord?.quality ?? "");
  const [selectedExtension, setSelectedExtension] = useState(
    selectedChord?.extension ?? "",
  );

  const onSelectNote = (note: string) => {
    onSelect({ letter: note, quality: selectedQuality, extension: selectedExtension });
  };

  const isMajor = (quality: string | undefined) => {
    console.log(quality)
    if (!quality) return true;
    return ["", "maj", "major"].includes(quality.toLowerCase());
  };

  return (
    <div className="chord-selector-container">
      <div className="chord-selector-major-minor mb-4">
        <button
          className={`chord-selector-chord m-2 px-4 py-1 text-center text-sm ${tw.BTN_PRIMARY_BORDER} rounded-md ${!!isMajor(selectedQuality) && "bg-violet-700"}`}
          onClick={() => setSelectedQuality("Maj")}
        >
          Major
        </button>
        <button
          className={`chord-selector-chord m-2 px-4 py-1 text-center text-sm ${tw.BTN_PRIMARY_BORDER} rounded-md ${!isMajor(selectedQuality) && "bg-violet-700"}`}
          onClick={() => setSelectedQuality("m")}
        >
          Minor
        </button>
      </div>
      <div className="chord-selector-sharps-container flex justify-between px-9">
        {SHARPS.map((note, i) => (
          <ChordSelectorItem
            className={i === 1 ? "mr-16" : ""}
            note={note}
            key={i + "-chord"}
            onClick={(note) => onSelectNote(note)}
            selected={selectedChord?.letter === note}
          />
        ))}
      </div>
      <div className="chord-selector-naturals-container flex justify-between">
        {NATURALS.map((note, i) => (
          <ChordSelectorItem
            note={note}
            key={i + "-chord"}
            onClick={(note) => onSelectNote(note)}
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
  selected,
}: {
  note: string;
  className?: string;
  onClick: (note: string) => void;
  selected?: boolean;
}) {
  return (
    <button
      className={`chord-selector-chord m-2 w-10 p-2 text-center text-xs ${tw.BTN_PRIMARY_BORDER} rounded-md ${className} ${!!selected && "bg-violet-700"}`}
      onClick={() => onClick(note)}
    >
      {note}
    </button>
  );
}
