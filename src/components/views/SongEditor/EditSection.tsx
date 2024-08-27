"use client";
import { ISongDb, IOrder, ISection, IWord } from "@/interfaces/db/ISongDb";
import { updateSongSectionFromText, getWordsFromSection } from "@/utils/SongUtil";
import { useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import Section from "@/components/song/Section";
import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { updateSongById } from "@/clients/songClient";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { useSongContext } from "@/providers/SongProvider";
import autoResizeInputToFitText from "@/utils/HtmlInputUtil";

export default function EditSection({
  order,
  onSectionChange,
  edit,
  index,
  onDelete,
}: {
  edit?: boolean;
  order: IOrder;
  index: number;
  onSectionChange?: (section: ISection | null | undefined) => void;
  onDelete?: (order: IOrder, section: ISection | null | undefined) => void;
}) {
  const { song, setSong } = useSongContext();
  const section = song?.sections?.[order?.sectionName];
  const [isEditing, setIsEditing] = useState(!!edit);
  const [editText, setEditText] = useState(getWordsFromSection(section));
  const [editTitleText, setEditTitleText] = useState(section?.title ?? "");
  const [isPencilShown, setIsPencilShown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const inputRef = useRef(null);

  const onEditButtonClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        autoResizeInputToFitText(inputRef.current);
      }
    }, 1);
  };

  const onTextChange = (
    section: ISection | null | undefined,
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!e.target) return;
    autoResizeInputToFitText(e.target);
    setEditText(e.target.value);
    onSectionChange?.(section);
  };

  const onSectionTitleChange = (section: ISection | null | undefined, value: string) => {
    setEditTitleText(value);
    onSectionChange?.(section);
  };

  const done = async () => {
    if (!song) return;
    let section = song.sections[order.sectionName];
    section = updateSongSectionFromText(editText, section);
    section.title = editTitleText;
    song.sections[order.sectionName] = section;
    await updateSong(song);
  };

  const updateSong = async (song: ISongDb) => {
    try {
      setIsSaving(true);
      setSong(song);
      await updateSongById(song._id, song);
    } catch (error) {
      console.error("error updating section", error);
      throw error;
    } finally {
      setIsEditing(false);
      setIsSaving(false);
    }
  };

  const deleteSection = async (sectionKey: string, orderIndex: number) => {
    if (!song) return;
    if (!song.sections[sectionKey]) {
      console.error("Error Deleting Section - section not found", { sectionKey, song });
      throw new Error("Error Deleting Section - section not found");
    }
    if (!order.showSectionTitleOnly) {
      delete song.sections[sectionKey];
      song.order = song.order.filter((o) => o.sectionName !== sectionKey && !o.isRepeat);
    } else {
      song.order.splice(orderIndex, 1);
    }
    await updateSong(song);
    onDelete?.(order, section);
  };

  const onChordChange = async (word: IWord) => {
    if (!song) return;
    await updateSong(song);
  };

  return (
    <div className="flex justify-center">
      {isSaving && <LoadingDisplay text="Saving..." />}
      {!isSaving && (
        <div className="container max-w-2xl">
          {isEditing && (
            <div className="mb-10">
              {!!order?.showSectionTitleOnly && (
                <h3 className="mb-3 mt-5 text-center text-lg font-bold">
                  {section?.title}
                  {!!order?.repeatCount && `[x${order.repeatCount}]`}
                </h3>
              )}
              {!order?.showSectionTitleOnly && (
                <>
                  <ThemedTextInput
                    className="text-center"
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
                </>
              )}
              <div className="flex w-full justify-end p-2">
                <ThemedButton
                  className=""
                  text="Delete"
                  color="danger-secondary"
                  onClick={() => deleteSection(order.sectionName, index)}
                />
                <ThemedButton
                  className=""
                  color="primary"
                  text="Done"
                  onClick={() => done()}
                />
              </div>
            </div>
          )}
          {!isEditing && (
            <div
              className="container relative rounded-lg p-5 hover:bg-slate-400/30 dark:hover:bg-white/10"
              onMouseEnter={() => setIsPencilShown(true)}
              onMouseLeave={() => setIsPencilShown(false)}
            >
              {isPencilShown && (
                <button className="absolute right-5" onClick={() => onEditButtonClick()}>
                  <FaPencil />
                </button>
              )}
              {!!section && (
                <Section
                  edit={true}
                  section={section}
                  showSectionTitleOnly={!!order.showSectionTitleOnly}
                  repeatCount={order?.repeatCount}
                  onChordChange={onChordChange}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
