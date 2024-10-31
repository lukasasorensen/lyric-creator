import { IChord, IMeasure } from "@/interfaces/db/ISongDb";
import Chord from "./Chord";
import { CirclePlusButton } from "../common/CirclePlusButton";

export interface IMeasureProps {
  measure: IMeasure;
  index?: number;
  onChordChange?: (chord: IChord) => void;
  edit?: boolean;
}

export default function Measure(props: IMeasureProps) {
  return (
    <div className="measure-container">
      {props.measure.chords.map((chord, i) => (
        <Chord
          chord={chord}
          key={`measure-${props.index}-chord-${i}`}
          onChordChange={(newChord) => props?.onChordChange?.(newChord)}
        />
      ))}
    </div>
  );
}
