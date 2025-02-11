import { IChord } from "@/interfaces/db/ISongDb";
import { getChordSuggestionsForKey } from "@/utils/SongKeyUtil";
import { ChordSelectorItem } from "./ChordSelectorItem";

export function SongKeyChordSuggestions({
  songKey,
  selectedChord,
  onSelectNote,
}: {
  songKey: IChord;
  selectedChord: IChord;
  onSelectNote?: (note: string) => void;
}) {
  const chordsInKey = getChordSuggestionsForKey(songKey);
  return (
    <div className="container flex justify-center">
      {chordsInKey?.map((chord) => (
        <ChordSelectorItem
          text={chord.letter + chord?.quality ?? ""}
          key={chord.letter + "-chord"}
          selected={
            selectedChord?.letter === chord.letter &&
            selectedChord?.quality === chord.quality
          }
          onClick={(note) => onSelectNote?.(note)}
        />
      ))}
    </div>
  );
}
