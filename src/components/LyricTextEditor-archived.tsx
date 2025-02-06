import { ISongDb, ISection } from "@/interfaces/db/ISongDb";
import { useThemeContext } from "@/providers/ThemeProvider";
import { getWordsFromSection } from "@/utils/SongUtil";
import { Enter, getCode } from "keyboard-key";
import { useEffect, useState } from "react";
import { CirclePlusButton } from "./common/CirclePlusButton";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function LyricTextEditor({ song }: { song: ISongDb }) {
  const [isAddingNewSection, setIsAddingNewSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [songUpdate, setSong] = useState(song);

  const auto_grow = (element: HTMLElement) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + 5 + "px";
  };

  const onTextChange = (section: ISection, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target) return;
    auto_grow(e.target);
  };

  const onAddSectionButtonClick = () => {
    setIsAddingNewSection(true);
  };

  const onNewSectionTitleInputKeyDown = (e: KeyboardEvent) => {
    if (!newSectionTitle) return;

    if (getCode(e) === Enter) {
      songUpdate.sections[newSectionTitle] = { title: newSectionTitle, lines: [] };
      setSong({
        ...songUpdate,
      });
      setNewSectionTitle("");
      setIsAddingNewSection(false);
    }
  };

  useEffect(() => {
    const textAreas = document.getElementsByClassName("section-input");
    Array.from(textAreas).forEach((el) => auto_grow(el as HTMLElement));
  }, []);

  return (
    <div className="container w-full px-24">
      <h2 className="mb-10 text-center text-2xl font-bold">{songUpdate.title}</h2>
      {Object.values(songUpdate.sections).map((section: ISection, i: number) => (
        <div className="mb-10" key={i + "-section"}>
          <h2 className="mb-5 text-center">{section.title}</h2>
          <textarea
            className={`section-input block w-full rounded-md border border-gray-800 p-2.5 text-center leading-10 focus:border-blue-500 focus:ring-blue-500 ${tw.TEXT_PRIMARY} ${tw.BG_PRIMARY}`}
            defaultValue={getWordsFromSection(section)}
            onChange={(e) => onTextChange(section, e)}
          ></textarea>
        </div>
      ))}
      <div className="container flex justify-center">
        {!isAddingNewSection && <CirclePlusButton onClick={onAddSectionButtonClick} />}
        {isAddingNewSection && (
          <div className="flex flex-col">
            <h3 className="mb-2 text-center">Section Name</h3>
            <input
              value={newSectionTitle}
              autoFocus
              className={`block w-full max-w-60 rounded-md border border-gray-800 p-2 text-center focus:border-blue-500 focus:ring-blue-500 ${tw.TEXT_PRIMARY} ${tw.BG_PRIMARY}`}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              onKeyDown={onNewSectionTitleInputKeyDown}
            />
          </div>
        )}
      </div>
    </div>
  );
}
