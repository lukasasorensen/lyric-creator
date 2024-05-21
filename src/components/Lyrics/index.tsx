"use client";
import { ILyrics, IOrder, ISection } from "@/interfaces/Lyrics";
import Section from "./Section";
import { useThemeContext } from "@/providers/ThemeProvider";
import { FaPlus } from "react-icons/fa";
import { PopoverList, PopoverListItemButton } from "../common/Popover";
import { useEffect, useRef, useState } from "react";
import { getWordsFromSection } from "@/utils/LyricsUtil";
import { ThemedButton } from "../Themed";
import { FaPencil } from "react-icons/fa6";

function GetSectionFromOrder({ order, lyrics }: { order: IOrder; lyrics: ILyrics }) {
  const section = lyrics?.sections?.[order?.sectionName];
  const [isEditing, setIsEditing] = useState(false);
  const [isPencilShown, setIsPencilShown] = useState(false);
  const { twColorClasses } = useThemeContext();
  const inputRef = useRef(null);

  const onEditButtonClick = (element: HTMLElement) => {
    setIsEditing(true);
    if (inputRef.current) {
      auto_grow(inputRef.current);
    }
  };

  const auto_grow = (element: HTMLElement) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + 5 + "px";
  };

  const onTextChange = (section: ISection, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target) return;
    auto_grow(e.target);
  };

  return (
    <div className="flex justify-center">
      <div className="container max-w-2xl">
        {isEditing && (
          <div className="mb-10">
            <h2 className="mb-5 text-center">{section.title}</h2>
            <textarea
              className={`section-input block w-full rounded-md border border-gray-800 p-2.5 text-center leading-10 focus:border-blue-500 focus:ring-blue-500 ${twColorClasses.TEXT_PRIMARY} ${twColorClasses.BG_PRIMARY}`}
              defaultValue={getWordsFromSection(section)}
              onChange={(e) => onTextChange(section, e)}
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

export default function LyricChordEditor({ lyrics }: { lyrics: ILyrics }) {
  const addNewSection = () => {};

  const showSectionSelector = () => {};

  return (
    <div className="lyric-editor-container p-25 w-full">
      <h2 className="mb-5 text-center text-2xl font-bold">{lyrics.title}</h2>
      {lyrics?.order?.length &&
        lyrics.order.map((order, i) => (
          <GetSectionFromOrder key={i} order={order} lyrics={lyrics} index={i} />
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
  );
}
