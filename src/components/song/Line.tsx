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
  const onMoveChordToNextWord = (word: IWord) => {
    if (!line?.words?.length) return;
    const currentIndex = line.words?.findIndex((w) => w === word);
    if (currentIndex === -1) return;

    // if last word in line
    if (currentIndex === line.words.length - 1) {
      return;
    }

    // remove chord from current word
    const chord = word.chord;
    if (!chord) return;

    chord.offset = 0;
    delete word.chord;

    // get next word
    const nextWord = line.words[currentIndex + 1];
    if (!nextWord) return;

    // add chord to next word
    nextWord.chord = chord;

    onChordChange?.(word);
    onChordChange?.(nextWord);
  };

  const onMoveChordToPrevWord = (word: IWord) => {
    if (!line?.words?.length) return;
    const currentIndex = line.words?.findIndex((w) => w === word);
    if (currentIndex === -1 || currentIndex === 0) return;

    // remove chord from current word
    const chord = word.chord;
    if (!chord) return;

    chord.offset = 0;
    delete word.chord;

    // get prev word
    const prevWord = line.words[currentIndex - 1];
    if (!prevWord) return;

    // add chord to prev word
    prevWord.chord = chord;

    onChordChange?.(word);
    onChordChange?.(prevWord);
  };

  return (
    <div className="song-line-container whitespace-pre-line text-center leading-10">
      {line?.words?.map((word, i) => (
        <Word
          onMoveChordToNextWord={onMoveChordToNextWord}
          onMoveChordToPrevWord={onMoveChordToPrevWord}
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
