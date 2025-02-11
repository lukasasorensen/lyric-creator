import { IChord, ILine, IWord } from "@/interfaces/db/ISongDb";
import Measure from "./Measure";
import { useSongContext } from "@/providers/SongProvider";
import { ChordSelectorButton } from "@/components/ChordSelector";
import { useState } from "react";
import { debounce } from "lodash";
import { v4 as uuid } from "uuid";

export default function ChordLine({
  line,
  edit,
  onChordChange,
  onRemoveLine,
}: {
  line: ILine;
  edit?: boolean;
  onChordChange?: () => void;
  onRemoveLine?: () => void;
}) {
  const { song } = useSongContext();

  const addChordToNewMeasureOnLine = (line: ILine, chord: IChord) => {
    //add chord logic
    const newMeasure = { _id: uuid(), chords: [chord] };
    if (!line?.measures) {
      line.measures = [newMeasure];
    } else {
      line.measures.push(newMeasure);
    }

    onChordChange?.();
  };

  const [isAddChordButtonShown, setIsAddChordButtonShown] = useState(false);

  const onMouseEnterAddButton = () => {
    setIsAddChordButtonShown(true);
  };

  const onMouseLeaveAddButton = debounce(() => {
    setIsAddChordButtonShown(false);
  }, 100);

  const removeMeasure = (measureIndex: number) => {
    if (measureIndex < 0 || !line?.measures?.length) return;
    line.measures.splice(measureIndex, 1);

    if (!line.measures?.length) {
      onRemoveLine?.();
    }

    onChordChange?.();
  };

  return (
    <div className="song-line-container mb-3 flex flex-wrap justify-center whitespace-pre-line text-center leading-7">
      {line?.measures?.map((measure, i) => (
        <div key={`${i}-measure`} className="measure-container flex">
          <Measure
            measure={measure}
            index={i}
            edit={edit}
            onChordChange={() => onChordChange?.()}
            onRemoveMeasure={() => removeMeasure(i)}
          />
        </div>
      ))}
      {!!edit && (
        <div
          onMouseEnter={() => onMouseEnterAddButton()}
          onMouseLeave={() => onMouseLeaveAddButton()}
          className={`add-chord-button-container -ml-2 -mt-4 p-4 ${isAddChordButtonShown && "visible ml-1 mr-1"}`}
        >
          <ChordSelectorButton
            songKey={song?.key ? { ...song.key } : undefined}
            key="add-measure-chord-selector"
            closeOnSelect={true}
            onSelect={(chord) => {
              addChordToNewMeasureOnLine(line, chord);
            }}
            initialChord={song?.key ? { ...song.key } : undefined}
            enableExtensions={true}
            showSelectButton={true}
            showSuggestions={true}
            selectButtonLabel="Add Measure"
          />
        </div>
      )}
    </div>
  );
}
