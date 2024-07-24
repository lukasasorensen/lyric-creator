"use client";
import { ILyricsDb, IOrder, ISection } from "@/interfaces/db/ILyricsDb";
import { updateLyricSectionFromText, getWordsFromSection } from "@/utils/LyricsUtil";
import { useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import Section from "./Section";
import { ThemedButton } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { updateLyricById } from "@/clients/lyricClient";

export default function EditSection({
  order,
  lyrics,
  onSectionChange,
}: {
  order: IOrder;
  lyrics: ILyricsDb;
  onSectionChange?: (section: ISection) => void;
}) {
  const section = lyrics?.sections?.[order?.sectionName];
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [isPencilShown, setIsPencilShown] = useState(false);
  
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

  const done = () => {
    let section = lyrics.sections[order.sectionName];
    section = updateLyricSectionFromText(editText, section);
    lyrics.sections[order.sectionName] = section;
    setIsEditing(false);
    // post to db
    console.log('lyrics POST - ', lyrics);
    updateLyricById(lyrics._id, lyrics);
  };

  return (
    <div className="flex justify-center">
      <div className="container max-w-2xl">
        {isEditing && (
          <div className="mb-10">
            <h2 className="mb-5 text-center">{section.title}</h2>
            <div className="flex w-full">
              <ThemedButton className="ml-auto" text="Done" onClick={() => done()} />
            </div>
            <textarea
              className={`section-input block w-full rounded-md border border-gray-800 p-2.5 text-center leading-10 focus:border-blue-500 focus:ring-blue-500 ${tw.TEXT_PRIMARY} ${tw.BG_PRIMARY}`}
              defaultValue={getWordsFromSection(section)}
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
    </div>
  );
}
