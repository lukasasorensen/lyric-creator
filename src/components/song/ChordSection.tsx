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
  const addNewLine = (chord: IChord) => {
    //add chord logic
    const newLine = { measures: [{ chords: [chord] }] };

    section.lines ??= [];
    section.lines.push(newLine);

    onChordChange?.();
  };

  return (
    <div className="song-section">
      <h3 className="mb-5 mt-2 text-center text-lg font-bold">
        {getSectionTitle(section?.title, !!showSectionTitleOnly)}{" "}
        {!!repeatCount && `[x${repeatCount}]`}
      </h3>
      {!showSectionTitleOnly &&
        !!section?.lines?.length &&
        section.lines.map((line: ILine, i: number) => (
          <ChordLine line={line} key={i} edit={edit} onChordChange={onChordChange} />
        ))}
      {edit && (
        <div
          className={`add-first-chord-button mt-2 flex h-0 w-full justify-center opacity-0 transition-opacity hover:h-auto hover:opacity-100 ${!section?.lines?.length && "show-on-container-hover"}`}
        >
          <ChordSelectorButton
            key="edit-title-chord-selector"
            onSelect={(chord) => {
              addNewLine(chord);
            }}
            initialChord={song?.key ? { ...song.key } : undefined}
            enableExtensions={false}
            showSelectButton={true}
            selectButtonLabel="Add Line"
          />
        </div>
      )}
    </div>
  );
}
