"use client";
import { ILyricsUi } from "@/interfaces/ui/ILyricsUi";
import { PopoverList, PopoverListItemButton } from "@/components/common/Popover";
import EditSection from "./EditSection";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function LyricEditor({ lyrics }: { lyrics: ILyricsUi }) {
  const addNewSection = () => {};

  const showSectionSelector = () => {};

  return (
    <div className="lyrics-container">
      <div className="lyric-editor-container p-25 w-full">
        <h2 className="mb-5 text-center text-2xl font-bold">{lyrics.title}</h2>
        {lyrics?.order?.length &&
          lyrics.order.map((order, i) => (
            <EditSection key={i} order={order} lyrics={lyrics} />
          ))}
        <div className="flex w-full justify-center">
          <PopoverList>
            <PopoverListItemButton
              text="Add New Section"
              onClick={addNewSection}
            ></PopoverListItemButton>
            <PopoverListItemButton
              text="Repeat Section"
              onClick={showSectionSelector}
            ></PopoverListItemButton>
          </PopoverList>
        </div>
      </div>
    </div>
  );
}
