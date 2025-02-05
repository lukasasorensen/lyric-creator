import { FLATS, NATURALS, SHARPS } from "@/constants/Notes";
import { IChord } from "@/interfaces/db/ISongDb";
import { ChordSelectorItem } from "./ChordSelectorItem";

export function NoteSelector({
  onSelectNote,
  selectedChord,
  sharpsOrFlats,
}: {
  onSelectNote: (note: string) => void;
  selectedChord: IChord;
  sharpsOrFlats: string;
}) {
  return (
    <div className="note-selector-container text-center">
      <div className="chord-selector-sharps-container flex justify-between px-9">
        {(sharpsOrFlats === "sharps" ? SHARPS : FLATS).map(({ letter }, i) => (
          <ChordSelectorItem
            className={i === 1 ? "mr-16" : ""}
            text={letter}
            key={i + "-chord"}
            onClick={(note) => onSelectNote(note)}
            selected={selectedChord?.letter === letter}
          />
        ))}
      </div>
      <div className="chord-selector-naturals-container flex justify-between">
        {NATURALS.map(({ letter }, i) => (
          <ChordSelectorItem
            text={letter}
            key={i + "-chord"}
            onClick={(note) => onSelectNote(note)}
            selected={selectedChord?.letter === letter}
          />
        ))}
      </div>
    </div>
  );
}
