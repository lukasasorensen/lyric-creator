"use client";
import { IOrder, ISongDb, IWord } from "@/interfaces/db/ISongDb";
import { PopoverList, PopoverListItemButton } from "@/components/common/Popover";
import EditSection from "./editSection/EditSection";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ThemedButton, ThemedTextInput, ThemedToggle } from "@/components/Themed";
import { deleteSongById, getSongById, updateSongById } from "@/clients/songClient";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { createKebabFromText } from "@/utils/StringUtil";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { useSongContext } from "@/providers/SongProvider";
import EditSongTitle from "./EditSongTitle";
import { getLinesFromText, getUniqueSectionKeyAndTitleForSong } from "@/utils/SongUtil";
import autoResizeInputToFitText from "@/utils/HtmlInputUtil";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import EditSongKey from "./EditSongKey";
import { SectionTypes } from "@/constants/SectionTypes";

export default function SongEditor() {
  const router = useRouter();
  const { song, setSong } = useSongContext();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionWords, setNewSectionWords] = useState("");
  const [showNewSectionInput, setShowNewSectionInput] = useState(false);
  const [showRepeatSectionSelector, setShowRepeatSectionSelector] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [newSectionType, setNewSectionType] = useState(SectionTypes.LYRICS);
  // sortable
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const inputRef = useRef(null);

  const addNewSection = async () => {
    if (!song || !newSectionTitle?.length) return;

    const { uniqueTitle, uniqueKey } = getUniqueSectionKeyAndTitleForSong(
      song,
      newSectionTitle,
    );

    song.sections = {
      ...song.sections,
      [uniqueKey]: {
        title: uniqueTitle,
        lines:
          newSectionType === SectionTypes.LYRICS ? getLinesFromText(newSectionWords) : [],
        type: newSectionType,
      },
    };

    song.order = [
      ...song.order,
      {
        sectionName: uniqueKey,
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

  const deleteSong = async () => {
    if (!song?._id) return;

    try {
      setIsLoading(true);
      await deleteSongById(song?._id);
    } catch (error) {
      // todo error handle
      console.error(error);
      throw new Error("Error Deleting Song");
    } finally {
      router.push("/my-songs");
      setIsLoading(false);
    }
  };

  const onNewSectionWordsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    autoResizeInputToFitText(e.target);
    setNewSectionWords(e.target.value);
  };

  const onChordsOnlyToggleChange = () => {
    let updatedSectionType =
      newSectionType === SectionTypes.CHORDS ? SectionTypes.LYRICS : SectionTypes.CHORDS;
    setNewSectionType(updatedSectionType);
  };

  const getOrderWithIds = (order: IOrder[]) => {
    return order.map((o, i) => ({ ...o, id: "orderid-" + i }));
  };

  const handleDragEnd = async ({
    active,
    over,
  }: {
    active: { id: string };
    over: { id: string };
  }) => {
    if (!song) return;

    if (active.id !== over.id) {
      song.order ??= [];

      const orderWithIds = getOrderWithIds(song.order);
      const oldIndex = orderWithIds.findIndex((o) => o.id === active.id);
      const newIndex = orderWithIds.findIndex((o) => o.id === over.id);

      song.order = arrayMove(song.order, oldIndex, newIndex);

      await updateSong(song);
    }
  };

  if (isLoading) {
    return <LoadingDisplay text="Loading..." />;
  }

  if (!isLoading && !song) {
    return <h1>Not Found 😔</h1>;
  }

  if (showDeleteWarning) {
    return (
      <div className="container p-24 text-center">
        <h2 className={`${tw.TEXT_PRIMARY} text-lg`}>
          Are you sure you want to DELETE your song,{" "}
          <strong className={tw.TEXT_SECONDARY}>{song?.title}</strong>?
        </h2>
        <div className="mt-10 flex w-full justify-center gap-5">
          <ThemedButton
            text="No, Cancel"
            color="secondary"
            onClick={() => setShowDeleteWarning(false)}
          />
          <ThemedButton text="Yes, Delete" color="danger" onClick={() => deleteSong()} />
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="song-editor-edit-title-container mb-4 p-4 text-center">
        <EditSongTitle />
        <EditSongKey />
      </div>
      <div
        className={`song-editor-outer-container container mx-auto flex max-w-screen-lg flex-col justify-center rounded-2xl ${tw.BG_SECONDARY} pb-10`}
      >
        {isSaving && <LoadingDisplay text="Saving..." />}
        {!isSaving && (
          <div className="song-container p-5">
            <SortableContext
              items={getOrderWithIds(song?.order ?? [])}
              strategy={verticalListSortingStrategy}
            >
              <div className="song-editor-container p-25 w-full">
                {!!song?.order?.length &&
                  getOrderWithIds(song.order).map((order, i) => (
                    <div key={'edit-section-' + i} className="mb-2">
                      <EditSection id={order.id} key={i} index={i} order={order} />
                    </div>
                  ))}
                {showNewSectionInput && (
                  <div className="container mb-8 flex justify-center">
                    <div className="container max-w-screen-md">
                      <div className="float-right p-4">
                        <label className="mr-4">Chords Only</label>
                        <ThemedToggle
                          onChange={onChordsOnlyToggleChange}
                          checked={newSectionType === SectionTypes.CHORDS}
                        ></ThemedToggle>
                      </div>
                      <div>
                        <ThemedTextInput
                          className="mb-2 text-center"
                          autoFocus
                          onChange={(e) => setNewSectionTitle(e.target.value)}
                          placeholder="New Section Name"
                        />
                        {newSectionType === SectionTypes.LYRICS && (
                          <textarea
                            className={`section-input block w-full rounded-md  border border-gray-800 p-2.5 text-center leading-10 focus:border-blue-500 focus:ring-blue-500 ${tw.TEXT_PRIMARY} ${tw.BG_PRIMARY}`}
                            onChange={(e) => onNewSectionWordsChange(e)}
                            placeholder="New Section Words"
                            ref={inputRef}
                          ></textarea>
                        )}
                      </div>
                      <div className="flex w-full justify-end py-5">
                        <ThemedButton
                          className="mr-5"
                          text="Cancel"
                          color="warn"
                          onClick={() => setShowNewSectionInput(false)}
                        />
                        <ThemedButton
                          color="primary"
                          text="Done"
                          onClick={() => addNewSection()}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {showRepeatSectionSelector && (
                  <div className={`container mb-8 mt-10 flex justify-center`}>
                    <div
                      className={`container mb-8 w-fit rounded-md p-5 text-center ${tw.BG_TERTIARY}`}
                    >
                      <h2 className={`${tw.TEXT_PRIMARY} mb-5`}>
                        Select Section To Repeat
                      </h2>
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
            </SortableContext>
          </div>
        )}
      </div>
      <div className="container">
        <ThemedButton
          className="float-right mt-5"
          text="Delete"
          color="danger-secondary"
          onClick={() => setShowDeleteWarning(true)}
        />
      </div>
    </DndContext>
  );
}
