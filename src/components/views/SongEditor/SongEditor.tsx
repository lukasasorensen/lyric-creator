"use client";
import { ISongDb } from "@/interfaces/db/ISongDb";
import { PopoverList, PopoverListItemButton } from "@/components/common/Popover";
import EditSection from "./EditSection";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ThemedButton } from "@/components/Themed";
import { updateSongById } from "@/clients/songClient";

export default function SongEditor({ song }: { song: ISongDb }) {
  const addNewSection = () => {
    debugger;
  };

  const showSectionSelector = () => {};

  return (
    <div
      className={`song-editor-outer-container container mx-auto flex max-w-screen-lg flex-col justify-center rounded-2xl ${tw.BG_SECONDARY} py-10`}
    >
      <div className="song-container">
        <div className="song-editor-container p-25 w-full">
          <h2 className="mb-5 text-center text-2xl font-bold">{song.title}</h2>
          {song?.order?.length &&
            song.order.map((order, i) => (
              <EditSection key={i} order={order} song={song} />
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
