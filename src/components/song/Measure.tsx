import { IChord, IMeasure } from "@/interfaces/db/ISongDb";
import Chord from "./Chord";
import { useSongContext } from "@/providers/SongProvider";
import { useState } from "react";
import { debounce } from "lodash";
import { ChordSelectorButton } from "@/components/ChordSelector";

export interface IMeasureProps {
  measure: IMeasure;
  index?: number;
  onChordChange?: (chord: IChord | null) => void;
  onRemoveMeasure?: () => void;
  edit?: boolean;
}

export default function Measure(props: IMeasureProps) {
  const { song } = useSongContext();
  const [isAddChordButtonShown, setIsAddChordButtonShown] = useState(false);

  const addChordToMeasure = (chord: IChord) => {
    props.measure.chords ??= [];
    props.measure.chords.push(chord);
    props.onChordChange?.(chord);
  };

  const onChangeExistingChord = (chord: IChord, i: number) => {
    props.measure.chords[i] = chord;
    props.onChordChange?.(chord);
  };

  const onMouseEnterAddButton = () => {
    setIsAddChordButtonShown(true);
  };

  const onMouseLeaveAddButton = debounce(() => {
    setIsAddChordButtonShown(false);
  }, 300);

  const removeChord = (chordIndex: number) => {
    if (chordIndex < 0 || !props?.measure?.chords?.length) return;

    if (chordIndex === 0 && props.measure.chords.length === 1) {
      props.onRemoveMeasure?.();
      props.measure.chords = [];
      return;
    }

    props.measure.chords.splice(chordIndex, 1);
    props.onChordChange?.(null);
  };

  return (
    <div className="measure-container flex">
      <div className="flex">
        {props.measure.chords.map((chord, i) => (
          <div key={`measure-${props.index}-chord-${i}`} className="ml-2 inline">
            <Chord
              edit={props.edit}
              chord={chord}
              onChordChange={(newChord) => onChangeExistingChord(newChord, i)}
              onRemoveChord={() => removeChord(i)}
            />
          </div>
        ))}
      </div>
      {!!props.edit && (
        <div
          onMouseEnter={() => onMouseEnterAddButton()}
          onMouseLeave={() => onMouseLeaveAddButton()}
          className={`add-chord-button-container ${isAddChordButtonShown && "visible ml-1 mr-1"}`}
        >
          <ChordSelectorButton
            key="edit-title-chord-selector"
            songKey={song?.key ? { ...song.key } : undefined}
            onSelect={(chord) => {
              addChordToMeasure(chord);
            }}
            initialChord={song?.key ? { ...song.key } : undefined}
            enableExtensions={false}
            showSelectButton={true}
            selectButtonLabel="Add Chord"
          />
        </div>
      )}

      <div className={`measure-divider inline pl-1 pr-1 text-gray-500`}>|</div>
    </div>
  );
}
