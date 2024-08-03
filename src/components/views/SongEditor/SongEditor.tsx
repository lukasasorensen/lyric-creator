"use client";
import { ISongDb } from "@/interfaces/db/ISongDb";
import { PopoverList, PopoverListItemButton } from "@/components/common/Popover";
import EditSection from "./EditSection";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { getSongById, updateSongById } from "@/clients/songClient";
import { useEffect, useState } from "react";
import { createKebabFromText } from "@/utils/StringUtil";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { useSongContext } from "@/providers/SongProvider";
import EditSongTitle from "./EditSongTitle";

export default function SongEditor({ songId }: { songId: string }) {
  const { song, setSong } = useSongContext();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showNewSectionInput, setShowNewSectionInput] = useState(false);
  const [showRepeatSectionSelector, setShowRepeatSectionSelector] = useState(false);

  const addNewSection = async () => {
    if (!song) return;

    const sectionKey = createKebabFromText(newSectionTitle);
    if (!!song?.sections[sectionKey]) {
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

    await updateSong(song);

    setShowNewSectionInput(false);
  };

  const updateSong = async (song: ISongDb) => {
    try {
      setIsSaving(true);
      setSong(song);
      await updateSongById(song._id, song);
    } catch (error) {
      console.error("addNewSection - error updating song by id", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const repeatSection = async (sectionKey: string) => {
    if (!sectionKey?.length || !song?.sections?.[sectionKey]?.title) {
      console.error("Error Repeating section, no section found with that sectionKey", {
        sectionKey,
      });
      throw new Error("Error Repeating Section");
    }

    const lastSectionInOrder = song?.order?.[song.order.length - 1];
    if (lastSectionInOrder && lastSectionInOrder?.sectionName === sectionKey) {
      lastSectionInOrder.repeatCount ??= 1;
      lastSectionInOrder.repeatCount++;
    } else {
      song.order = [
        ...song.order,
        {
          sectionName: sectionKey,
          showSectionTitleOnly: true,
        },
      ];
    }

    await updateSong(song);

    setShowRepeatSectionSelector(false);
  };

  useEffect(() => {
    const init = async () => {
      const getSong: ISongDb = await getSongById(songId);
      setSong(getSong);
      setIsLoading(false);
    };

    init();
  }, [songId, setSong]);

  if (isLoading) {
    return <LoadingDisplay text="Loading..." />;
  }

  if (!isLoading && !song) {
    return <h1>Not Found 😔</h1>;
  }

  return (
    <div
      className={`song-editor-outer-container container mx-auto flex max-w-screen-lg flex-col justify-center rounded-2xl ${tw.BG_SECONDARY} py-10`}
    >
      {isSaving && <LoadingDisplay text="Saving..." />}
      {!isSaving && (
        <div className="song-container mt-10">
          <div className="song-editor-container p-25 w-full">
            <EditSongTitle />
            {song?.order?.length &&
              song.order.map((order, i) => (
                <EditSection key={i} index={i} order={order} />
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
            {showRepeatSectionSelector && (
              <div className={`container mb-8 mt-10 flex justify-center`}>
                <div
                  className={`container mb-8 w-fit rounded-md p-5 text-center ${tw.BG_TERTIARY}`}
                >
                  <h2 className={`${tw.TEXT_PRIMARY} mb-5`}>Select Section To Repeat</h2>
                  <div className="flex justify-center gap-5">
                    {!!song?.sections &&
                      Object.keys(song?.sections).map((sectionKey: string) => (
                        <ThemedButton
                          color="secondary"
                          key={sectionKey}
                          text={song?.sections[sectionKey]?.title ?? ""}
                          onClick={() => repeatSection(sectionKey)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}
            {!showRepeatSectionSelector && !showNewSectionInput && (
              <div className="mt-10 flex w-full justify-center">
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
