import { IChord, ILine, IWord } from "@/interfaces/db/ISongDb";
import Word from "@/components/song/Word";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import Chord from "./Chord";
import Measure from "./Measure";
import ChordSelectorButton from "../views/ChordSelector/ChordSelectorButton";
import { useSongContext } from "@/providers/SongProvider";

export default function ChordLine({
  line,
  edit,
  onChordChange,
}: {
  line: ILine;
  edit?: boolean;
  onChordChange?: (chord: IChord) => void;
}) {
  const { song } = useSongContext();

  const addChordToNewMeasureOnLine = (line: ILine, chord: IChord) => {
    //add chord logic
    const newMeasure = { chords: [chord] };
    if (!line?.measures) {
      line.measures = [newMeasure];
    } else {
      line.measures.push(newMeasure);
    }

    onChordChange?.(chord);
  };

  return (
    <div className="song-line-container mb-3 flex flex-wrap justify-center whitespace-pre-line text-center leading-7">
      {line?.measures?.map((measure, i) => (
        <div key={`${i}-measure`} className="measure-container flex">
          <Measure
            measure={measure}
            index={i}
            edit={edit}
            onChordChange={(newChord) => onChordChange?.(newChord)}
          />
        </div>
      ))}
      {!!edit && (
        <div className={`add-chord-button-container ml-2`}>
          <ChordSelectorButton
            songKey={song?.key ? { ...song.key } : undefined}
            key="add-measure-chord-selector"
            onSelect={(chord) => {
              addChordToNewMeasureOnLine(line, chord);
            }}
            initialChord={song?.key ? { ...song.key } : undefined}
            enableExtensions={false}
            showSelectButton={true}
            selectButtonLabel="Add Measure"
          />
        </div>
      )}
    </div>
  );
}
