import { IChord, IMeasure } from "@/interfaces/db/ISongDb";
import Chord from "./Chord";
import { CirclePlusButton } from "../common/CirclePlusButton";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import ChordSelectorButton from "../views/ChordSelector/ChordSelectorButton";
import { useSongContext } from "@/providers/SongProvider";
import { useState } from "react";

export interface IMeasureProps {
  measure: IMeasure;
  index?: number;
  onChordChange?: (chord: IChord) => void;
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

  return (
    <div
      className="measure-container flex"
      onMouseEnter={() => setIsAddChordButtonShown(true)}
      onMouseLeave={() => setIsAddChordButtonShown(false)}
    >
      <div className="flex">
        {props.measure.chords.map((chord, i) => (
          <div key={`measure-${props.index}-chord-${i}`} className="ml-2 inline">
            <Chord
              edit={props.edit}
              chord={chord}
              onChordChange={(newChord) => onChangeExistingChord(newChord, i)}
            />
          </div>
        ))}
      </div>
      {!!props.edit && (
        <div
          className={`add-chord-button-container ${isAddChordButtonShown && "visible ml-1 mr-1"}`}
        >
          <ChordSelectorButton
            key="edit-title-chord-selector"
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
