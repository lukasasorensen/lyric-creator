"use client";
import Line from "@/components/song/Line";
import { ILine, ISection } from "@/interfaces/db/ISongDb";

const getSectionTitle = (title: string, showSectionTitleOnly: boolean) => {
  return showSectionTitleOnly ? `[${title}]` : title;
};

export default function Section({
  section,
  showSectionTitleOnly,
  repeatCount,
}: {
  section: ISection;
  showSectionTitleOnly: boolean;
  repeatCount?: number;
}) {
  return (
    <div className="song-section">
      <h3 className="mb-3 mt-5 text-center text-lg font-bold">
        {getSectionTitle(section?.title, !!showSectionTitleOnly)}{" "}
        {repeatCount && `[x${repeatCount}]`}
      </h3>
      {!showSectionTitleOnly &&
        !!section?.lines?.length &&
        section.lines.map((line: ILine, i: number) => <Line line={line} key={i} />)}
    </div>
  );
}
