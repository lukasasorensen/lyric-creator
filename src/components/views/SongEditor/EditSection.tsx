"use client";
import { ISongDb, IOrder, ISection } from "@/interfaces/db/ISongDb";
import { updateSongSectionFromText, getWordsFromSection } from "@/utils/SongUtil";
import { useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import Section from "./Section";
import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { updateSongById } from "@/clients/songClient";
import LoadingDisplay from "@/components/common/LoadingDisplay";

export default function EditSection({
  order,
  song,
  onSectionChange,
  edit,
}: {
  edit?: boolean;
  order: IOrder;
  song: ISongDb;
  onSectionChange?: (section: ISection) => void;
}) {
  const section = song?.sections?.[order?.sectionName];
  const [isEditing, setIsEditing] = useState(!!edit);
  const [editText, setEditText] = useState(getWordsFromSection(section));
  const [editTitleText, setEditTitleText] = useState(section.title);
  const [isPencilShown, setIsPencilShown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const inputRef = useRef(null);

  const onEditButtonClick = (element: HTMLElement) => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        auto_grow(inputRef.current);
      }
    }, 1);
  };

  const auto_grow = (element: HTMLElement) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + 5 + "px";
  };

  const onTextChange = (section: ISection, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target) return;
    auto_grow(e.target);
    setEditText(e.target.value);
    onSectionChange?.(section);
  };

  const onSectionTitleChange = (section: ISection, value: string) => {
    setEditTitleText(value);
    onSectionChange?.(section);
  };

  const done = async () => {
    try {
      let section = song.sections[order.sectionName];
      section = updateSongSectionFromText(editText, section);
      section.title = editTitleText;
      song.sections[order.sectionName] = section;
      setIsEditing(false);
      // post to db
      console.log("song POST - ", song);
      setIsSaving(true);
      await updateSongById(song._id, song);
    } catch (error) {
      console.error("error updating section", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center">
      {isSaving && <LoadingDisplay text="Saving..." />}
      {!isSaving && (
        <div className="container max-w-2xl">
          {isEditing && (
            <div className="mb-10">
              <div className="flex w-full">
                <ThemedButton className="ml-auto" text="Done" onClick={() => done()} />
              </div>
              <ThemedTextInput
                placeholder="Section Title"
                onChange={(e) => {
                  onSectionTitleChange(section, e.target.value);
                }}
                value={editTitleText}
              />
              <textarea
                className={`section-input block w-full rounded-md border border-gray-800 p-2.5 text-center leading-10 focus:border-blue-500 focus:ring-blue-500 ${tw.TEXT_PRIMARY} ${tw.BG_PRIMARY}`}
                value={editText}
                onChange={(e) => onTextChange(section, e)}
                ref={inputRef}
              ></textarea>
            </div>
          )}
          {!isEditing && (
            <div
              className="container relative rounded-lg p-5 hover:bg-slate-400/30 dark:hover:bg-white/10"
              onMouseEnter={() => setIsPencilShown(true)}
              onMouseLeave={() => setIsPencilShown(false)}
            >
              {isPencilShown && (
                <button
                  className="absolute right-5"
                  onClick={(e) => onEditButtonClick(e.target)}
                >
                  <FaPencil />
                </button>
              )}
              <Section
                section={section}
                showSectionTitleOnly={!!order.showSectionTitleOnly}
                repeatCount={order?.repeatCount}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
