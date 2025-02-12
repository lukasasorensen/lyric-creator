import { IChord, ILine, IWord } from "@/interfaces/db/ISongDb";
import Word from "@/components/song/Word";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function Line({
  line,
  edit,
  onChordChange,
  onMoveChord,
}: {
  line: ILine;
  edit?: boolean;
  onChordChange?: (word: IWord) => void;
  onMoveChord?: (chord: IChord, moveToWordId: string) => void;
}) {
  return (
    <div className="song-line-container whitespace-pre-line text-center leading-10 -mt-3">
      {line?.words?.map((word, i) => (
        <Word
          onMoveChord={onMoveChord}
          word={word}
          key={`${i}-${word}`}
          index={i}
          edit={edit}
          onChordChange={onChordChange}
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
