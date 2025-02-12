"use client";
import { ISongDb, IOrder, ISection, IWord } from "@/interfaces/db/ISongDb";
import { useRef, useState } from "react";
import Section from "@/components/song/Section";
import { updateSongById } from "@/clients/songClient";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { useSongContext } from "@/providers/SongProvider";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaBars } from "react-icons/fa";
import { SectionTypes } from "@/constants/SectionTypes";
import ChordSection from "@/components/song/ChordSection";
import { debounce } from "lodash";
import EditSectionDropDownMenu from "./EditSectionDropDownMenu";
import EditSectionText from "./EditSectionText";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

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
  const [editingState, setEditingState] = useState("view");
  const [isSaving, setIsSaving] = useState(false);

  // dnd sortable
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onEditTextButtonClick = () => {
    setEditingState("text");
  };

  const doneEditingText = async () => {
    setEditingState("view");
    if (!song) return;
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
      setIsSaving(false);
    }
  };

  const onDeleteSection = async () => {
    if (!song) return;

    await updateSong(song);
    setEditingState("view");
    onDelete?.(order, section);
  };

  const toggleHighlightSection = async () => {
    if (!song) return;

    order.isHighlighted = !order.isHighlighted;
    song.order[index].isHighlighted = order.isHighlighted;
    await updateSong(song);
  };

  const toggleHideSectionTitle = async () => {
    if (!song) return;

    order.hideTitle = !order.hideTitle;
    song.order[index].hideTitle = order.hideTitle;
    await updateSong(song);
  }

  const onChordChange = debounce(async () => {
    if (!song) return;
    await updateSong(song);
  }, 300);

  const onRepeatInputChange = async (repeatCount: number) => {
    if (!song) return;
    order.repeatCount = repeatCount;
    // todo using index is sketchy
    song.order[index].repeatCount = repeatCount;
    await updateSong(song);
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
        {editingState === "text" && (
          <EditSectionText
            onDone={doneEditingText}
            onSectionChange={onSectionChange}
            onDeleteSection={onDeleteSection}
            order={order}
            index={index}
          />
        )}
        {editingState !== "text" && (
          <div
            className={`edit-section-view-container container relative rounded-lg p-5  ${order.isHighlighted ? tw.BG_PRIMARY : "hover:bg-slate-400/30 dark:hover:bg-white/10"}`}
          >
            <div
              className="sortable-item-drag-handle absolute left-5 z-10"
              ref={setNodeRef}
              {...attributes}
              {...listeners}
            >
              <FaBars />
            </div>
            <div className="edit-section-pencil-button absolute right-5">
              <EditSectionDropDownMenu
                order={order}
                onEditTextClick={onEditTextButtonClick}
                onHighlightSectionClick={toggleHighlightSection}
                onRepeatInputChange={onRepeatInputChange}
                onHideTitleClick={toggleHideSectionTitle}
                showEditText={
                  section?.type === SectionTypes.LYRICS ||
                  section?.type === SectionTypes.PARAGRAPH
                }
              />
            </div>
            {!!section && (!section.type || section.type === SectionTypes.LYRICS) && (
              <div className="edit-section-container">
                <Section
                  edit={true}
                  section={section}
                  showSectionTitleOnly={!!order.showSectionTitleOnly}
                  hideTitle={!!order.hideTitle}
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
