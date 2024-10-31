"use client";
import { IChord, ILine, ISection, IWord } from "@/interfaces/db/ISongDb";
import ChordLine from "./ChordLine";
import { useSongContext } from "@/providers/SongProvider";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import ChordSelectorButton from "../views/ChordSelector/ChordSelectorButton";

const getSectionTitle = (title: string, showSectionTitleOnly: boolean) => {
  return showSectionTitleOnly ? `[${title}]` : title;
};

export default function ChordSection({
  section,
  showSectionTitleOnly,
  repeatCount,
  edit,
  onChordChange,
}: {
  section: ISection;
  showSectionTitleOnly: boolean;
  repeatCount?: number;
  edit?: boolean;
  onChordChange?: () => void;
}) {
  const { song } = useSongContext();
  const addFirstChord = (chord: IChord) => {
    //add chord logic
    const newLine = { measures: [{ chords: [chord] }] };

    section.lines = [newLine];

    onChordChange?.();
  };

  return (
    <div className="song-section">
      <h3 className="mb-3 mt-5 text-center text-lg font-bold">
        {getSectionTitle(section?.title, !!showSectionTitleOnly)}{" "}
        {!!repeatCount && `[x${repeatCount}]`}
      </h3>
      {!showSectionTitleOnly &&
        !!section?.lines?.length &&
        section.lines.map((line: ILine, i: number) => (
          <ChordLine line={line} key={i} edit={edit} onChordChange={onChordChange} />
        ))}
      {edit && !section?.lines?.length && (
        <div className="add-first-chord-button">
          <ChordSelectorButton
            key="edit-title-chord-selector"
            onSelect={(chord) => {
              addFirstChord(chord);
            }}
            onChordChange={(chord) => addFirstChord(chord)}
            initialChord={song?.key ? { ...song.key } : undefined}
            enableExtensions={false}
          />
        </div>
      )}
    </div>
  );
}
