"use client";
import { ILyricsDb } from "@/interfaces/db/ILyricsDb";
import { PopoverList, PopoverListItemButton } from "@/components/common/Popover";
import EditSection from "./EditSection";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ThemedButton } from "@/components/Themed";
import { updateLyricById } from "@/clients/lyricClient";

export default function LyricEditor({ lyrics }: { lyrics: ILyricsDb }) {
  const addNewSection = () => {};

  const showSectionSelector = () => {};

  return (
    <div
      className={`lyrics-editor-outer-container container max-w-screen-lg mx-auto flex flex-col justify-center rounded-2xl ${tw.BG_SECONDARY} py-10`}
    >
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
    </div>
  );
}
