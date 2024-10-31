"use client";
import { ISongDb, IOrder, ISection, IWord } from "@/interfaces/db/ISongDb";
import { updateSongSectionFromText, getWordsFromSection } from "@/utils/SongUtil";
import { useRef, useState } from "react";
import { FaEllipsis, FaPencil } from "react-icons/fa6";
import Section from "@/components/song/Section";
import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { updateSongById } from "@/clients/songClient";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { useSongContext } from "@/providers/SongProvider";
import autoResizeInputToFitText from "@/utils/HtmlInputUtil";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaBars } from "react-icons/fa";
import { NumberInputIncremeneter } from "@/components/common/NumberInputIncrementer";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { SectionTypes } from "@/constants/SectionTypes";
import ChordSection from "@/components/song/ChordSection";

export default function EditSection({
  order,
  onSectionChange,
  edit,
  index,
  onDelete,
  id,
}: {
  id: string;
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
  const [isSaving, setIsSaving] = useState(false);

  const inputRef = useRef(null);

  // dnd sortable
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    setIsEditing(false);
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
    setIsEditing(false);
    onDelete?.(order, section);
  };

  const onChordChange = async () => {
    if (!song) return;
    await updateSong(song);
  };

  const onRepeatInputChange = async (repeatCount: number) => {
    if (!song) return;
    order.repeatCount = repeatCount;
    // todo using index is sketchy
    song.order[index].repeatCount = repeatCount;
  };

  return (
    <div className={`song-editor-edit-section-container flex justify-center`}>
      {isSaving && (
        <div className="fixed left-0 right-0 flex justify-center">
          <LoadingDisplay text="Saving..." />
        </div>
      )}
      <div
        ref={setNodeRef}
        style={style}
        className={`${isSaving ? "opacity-30" : ""} container max-w-2xl`}
      >
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
                <div className="float-right text-right">
                  <NumberInputIncremeneter
                    onChange={onRepeatInputChange}
                    label="Repeat"
                    defaultValue={order.repeatCount ?? 0}
                    min={0}
                    step={1}
                    containerClassName="flex gap-2"
                    labelClassName="m-0 self-center"
                  />
                </div>
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
          <div className="edit-section-view-container container relative rounded-lg p-5 hover:bg-slate-400/30 dark:hover:bg-white/10">
            <div
              className="sortable-item-drag-handle absolute left-5"
              ref={setNodeRef}
              {...attributes}
              {...listeners}
            >
              <FaBars />
            </div>
            <button
              className="edit-section-pencil-button absolute right-5"
              onClick={() => onEditButtonClick()}
            >
              <FaPencil />
            </button>
            {!!section && (!section.type || section.type === SectionTypes.LYRICS) && (
              <div className="edit-section-container">
                <Section
                  edit={true}
                  section={section}
                  showSectionTitleOnly={!!order.showSectionTitleOnly}
                  repeatCount={order?.repeatCount}
                  onChordChange={onChordChange}
                />
              </div>
            )}
            {!!section && section.type === SectionTypes.CHORDS && (
              <div className="edit-section-container">
                <ChordSection
                  edit={true}
                  section={section}
                  showSectionTitleOnly={!!order.showSectionTitleOnly}
                  repeatCount={order?.repeatCount}
                  onChordChange={onChordChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
