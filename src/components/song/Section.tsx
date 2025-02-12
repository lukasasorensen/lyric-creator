"use client";
import Line from "@/components/song/Line";
import { IChord, ILine, ISection, IWord } from "@/interfaces/db/ISongDb";
import { replaceSectionWordChordByWordId } from "@/utils/SongUtil";

const getSectionTitle = (title: string, showSectionTitleOnly: boolean) => {
  return showSectionTitleOnly ? `[${title}]` : title;
};

export default function Section({
  section,
  showSectionTitleOnly,
  repeatCount,
  edit,
  hideTitle = false,
  onChordChange,
}: {
  section: ISection;
  showSectionTitleOnly: boolean;
  hideTitle?: boolean ;
  repeatCount?: number;
  edit?: boolean;
  onChordChange?: () => void;
}) {
  const onMoveChord = (chord: IChord, nextWordId: string) => {
    if (!chord || !nextWordId?.length) return;
    replaceSectionWordChordByWordId(section, nextWordId, chord);
    onChordChange?.();
  };
  return (
    <div className="song-section">
      {!hideTitle && <h3 className="mb-3 mt-5 text-center text-lg font-bold">
        {getSectionTitle(section?.title, !!showSectionTitleOnly)}{" "}
        {!!repeatCount && repeatCount > 1 && `[x${repeatCount}]`}
      </h3>}
      {!showSectionTitleOnly &&
        !!section?.lines?.length &&
        section.lines.map((line: ILine, i: number) => (
          <Line
            line={line}
            key={i}
            edit={edit}
            onChordChange={onChordChange}
            onMoveChord={onMoveChord}
          />
        ))}
    </div>
  );
}
