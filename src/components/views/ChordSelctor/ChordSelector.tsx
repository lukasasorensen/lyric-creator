import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
export default function ChordSelector() {
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const sharps = ["C#", "D#", "F#", "G#", "A#"];
  const flats = ["Db", "Eb", "Gb", "Ab", "Bb"];
  const naturals = ["C", "D", "E", "F", "G", "A", "B"];
  return (
    <div className="chord-selector-container">
      <div className="chord-selector-sharps-container flex justify-between px-9">
        {sharps.map((note, i) => (
          <ChordSelectorItem
            className={i === 1 ? "mr-16" : ""}
            note={note}
            key={i + "-chord"}
            onClick={(note) => {}}
          />
        ))}
      </div>
      <div className="chord-selector-naturals-container flex justify-between">
        {naturals.map((note, i) => (
          <ChordSelectorItem note={note} key={i + "-chord"} onClick={(note) => {}} />
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
  className: string;
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
