import { ILine, IWord } from "@/interfaces/db/ISongDb";
import Word from "@/components/song/Word";

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
    <div className="whitespace-pre-line text-center leading-10">
      {line.words.map((word, i) => (
        <Word
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
