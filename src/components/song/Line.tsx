import { ILine, IWord } from "@/interfaces/db/ISongDb";
import Word from "@/components/song/Word";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function Line({
  line,
  edit,
  onChordChange,
}: {
  line: ILine;
  edit?: boolean;
  onChordChange?: (word: IWord) => void;
}) {
  return (
    <div className="song-line-container whitespace-pre-line text-center leading-10">
      <div className="add-chord-before-container mr-4 inline-block">
        <AddChordButton />
      </div>

      {line.words.map((word, i) => (
        <Word
          word={word}
          key={`${i}-${word}`}
          index={i}
          edit={edit}
          onChordChange={onChordChange}
        />
      ))}

      <div className="add-chord-after-container ml-4 inline-block">
        <AddChordButton />
      </div>
    </div>
  );
}

export function AddChordButton() {
  return (
    <div className="chord-before-after-container ml-4 inline-block text-center">
      <button
        className={`add-chord-after-button ${tw.BTN_PRIMARY} flex flex-col h-5 w-5 justify-center rounded-full`}
      >
        +
      </button>
    </div>
  );
}
