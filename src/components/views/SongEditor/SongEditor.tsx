"use client";
import { ISongDb } from "@/interfaces/db/ISongDb";
import { PopoverList, PopoverListItemButton } from "@/components/common/Popover";
import EditSection from "./EditSection";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { updateSongById } from "@/clients/songClient";
import { useState } from "react";
import { createKebabFromText } from "@/utils/StringUtil";
import LoadingDisplay from "@/components/common/LoadingDisplay";

export default function SongEditor({ song }: { song: ISongDb }) {
  const [isSaving, setIsSaving] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showNewSectionInput, setShowNewSectionInput] = useState(false);
  const [showRepeatSectionSelector, setShowRepeatSectionSelector] = useState(false);

  const addNewSection = async () => {
    const sectionKey = createKebabFromText(newSectionTitle);
    if (!!song.sections[sectionKey]) {
      // todo handle this better
      console.error("Section with this name already exists");
      throw new Error("Cannot create section, section with this name already exists");
    }
    song.sections = {
      ...song.sections,
      [sectionKey]: {
        title: newSectionTitle,
        lines: [],
      },
    };

    song.order = [
      ...song.order,
      {
        sectionName: sectionKey,
        showSectionTitleOnly: false,
      },
    ];

    try {
      setIsSaving(true);
      await updateSongById(song._id, song);
      setShowNewSectionInput(false);
    } catch (error) {
      console.error("addNewSection - error updating song by id", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`song-editor-outer-container container mx-auto flex max-w-screen-lg flex-col justify-center rounded-2xl ${tw.BG_SECONDARY} py-10`}
    >
      {isSaving && <LoadingDisplay text="Saving..." />}
      {!isSaving && (
        <div className="song-container">
          <div className="song-editor-container p-25 w-full">
            <h2 className="mb-5 text-center text-2xl font-bold">{song.title}</h2>
            {song?.order?.length &&
              song.order.map((order, i) => (
                <EditSection key={i} order={order} song={song} />
              ))}
            {showNewSectionInput && (
              <div className="container mb-8 flex justify-center">
                <form onSubmit={addNewSection} className="container max-w-64">
                  <ThemedTextInput
                    className="text-center"
                    autoFocus
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder="New Section Name"
                  />
                </form>
              </div>
            )}
            <div className="flex w-full justify-center">
              <PopoverList>
                <PopoverListItemButton
                  text="Add New Section"
                  onClick={() => setShowNewSectionInput(true)}
                ></PopoverListItemButton>
                <PopoverListItemButton
                  text="Repeat Section"
                  onClick={() => setShowRepeatSectionSelector(true)}
                ></PopoverListItemButton>
              </PopoverList>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
