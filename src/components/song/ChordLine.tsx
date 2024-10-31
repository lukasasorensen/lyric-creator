import { IChord, ILine, IWord } from "@/interfaces/db/ISongDb";
import Word from "@/components/song/Word";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import Chord from "./Chord";
import Measure from "./Measure";

export default function ChordLine({
  line,
  edit,
  onChordChange,
}: {
  line: ILine;
  edit?: boolean;
  onChordChange?: (chord: IChord) => void;
}) {
  return (
    <div className="song-line-container whitespace-pre-line text-center leading-10">
      {line?.measures?.map((measure, i) => (
        <Measure
          measure={measure}
          key={`${i}-measure`}
          index={i}
          edit={edit}
          onChordChange={(newChord) => onChordChange?.(newChord)}
        />
      ))}
    </div>
  );
}

export function AddChordButton() {
  return (
    <div className="chord-before-after-container ml-4 inline-block text-center">
      <button
        className={`add-chord-after-button ${tw.BTN_PRIMARY} flex h-5 w-5 flex-col justify-center rounded-full`}
      >
        +
      </button>
    </div>
  );
}
