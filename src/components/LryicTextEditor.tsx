import { ILyrics, ISection } from "@/interfaces/Lyrics";
import { useThemeContext } from "@/providers/ThemeProvider";
import { getWordsFromLyrics, getWordsFromSection } from "@/utils/LyricsUtil";
import { useEffect, useMemo, useRef } from "react";

export default function LyricTextEditor({ lyrics }: { lyrics: ILyrics }) {
  const { twColorClasses } = useThemeContext();

  const auto_grow = (element: HTMLElement) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + 5 + "px";
  };

  const onTextChange = (section: ISection, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target) return;
    auto_grow(e.target);
  };

  useEffect(() => {
    const textAreas = document.getElementsByClassName("section-input");
    Array.from(textAreas).forEach((el) => auto_grow(el));
  }, []);

  return (
    <div className="container w-full px-24">
      <h2 className="mb-10 text-center text-2xl font-bold">{lyrics.title}</h2>
      {Object.values(lyrics.sections).map((section: ISection, i: number) => (
        <div className="mb-10" key={i + "-section"}>
          <h2 className="mb-5 text-center">{section.title}</h2>
          <textarea
            className={`section-input block w-full rounded-md border border-gray-800 p-2.5 text-center leading-10 focus:border-blue-500 focus:ring-blue-500 ${twColorClasses.TEXT_PRIMARY} ${twColorClasses.BG_PRIMARY}`}
            defaultValue={getWordsFromSection(section)}
            onChange={(e) => onTextChange(section, e)}
          ></textarea>
        </div>
      ))}
    </div>
  );
}
