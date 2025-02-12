import { ThemedButton, ThemedTextInput } from "@/components/Themed";
import { SectionTypes } from "@/constants/SectionTypes";
import { ISongDb, IOrder, ISection, IWord } from "@/interfaces/db/ISongDb";
import { useSongContext } from "@/providers/SongProvider";
import autoResizeInputToFitText from "@/utils/HtmlInputUtil";
import { getWordsFromSection, updateSongSectionFromText } from "@/utils/SongUtil";
import { useEffect, useRef, useState } from "react";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export interface IEditSectionTextProps {
  order: IOrder;
  index: number;
  onDone: () => void;
  onSectionChange?: (section: ISection | null | undefined) => void;
  onDeleteSection?: () => void;
}
export default function EditSectionText({
  order,
  onDone,
  onSectionChange,
  onDeleteSection,
}: IEditSectionTextProps) {
  const { song } = useSongContext();
  const section = song?.sections?.[order?.sectionName];
  const [editText, setEditText] = useState(getWordsFromSection(section));
  const [editTitleText, setEditTitleText] = useState(section?.title ?? "");
  const inputRef = useRef(null);

  const done = async () => {
    if (!song) return;
    let section = song.sections[order.sectionName];
    if (section.type === SectionTypes.LYRICS) {
      section = updateSongSectionFromText(editText, section);
    }
    section.title = editTitleText;
    song.sections[order.sectionName] = section;
    onDone();
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

    onDeleteSection?.();
  };

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        autoResizeInputToFitText(inputRef.current);
      }
    }, 1);
  });

  return (
    <div className="mb-10 rounded-lg bg-slate-400/30 bg-white/10 p-5">
      <>
        {!!order?.showSectionTitleOnly && (
          <div className="relative flex w-full">
            <h3 className="mb-3 w-full text-center text-lg font-bold">
              {section?.title}
              {!!order?.repeatCount && `[x${order.repeatCount}]`}
            </h3>
          </div>
        )}
        {!order?.showSectionTitleOnly && (
          <ThemedTextInput
            className="text-center"
            placeholder="Section Title"
            onChange={(e) => {
              onSectionTitleChange(section, e.target.value);
            }}
            value={editTitleText}
          />
        )}
        {!order?.showSectionTitleOnly && section?.type === SectionTypes.LYRICS && (
          <textarea
            className={`section-input mt-2 block w-full rounded-md border border-gray-800 p-2.5 text-center leading-10 focus:border-blue-500 focus:ring-blue-500 ${tw.TEXT_PRIMARY} ${tw.BG_PRIMARY}`}
            value={editText}
            onChange={(e) => onTextChange(section, e)}
            ref={inputRef}
          ></textarea>
        )}
      </>
      <div className="flex w-full justify-end p-2">
        <ThemedButton
          className=""
          text="Delete"
          color="danger-secondary"
          onClick={() => deleteSection(order.sectionName, index)}
        />
        <ThemedButton className="" color="primary" text="Done" onClick={() => done()} />
      </div>
    </div>
  );
}
