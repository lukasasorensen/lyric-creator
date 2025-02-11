import { IChord } from "@/interfaces/db/ISongDb";
import { useState } from "react";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { ChordSelectorItem } from "./ChordSelectorItem";
import { CHORD_EXTENSIONS } from "@/constants/Notes";

export function ChordExtensionsSelector({
  onSelectExtension,
  selectedChord,
}: {
  onSelectExtension: (extension: string) => void;
  selectedChord: IChord;
}) {
  const [isExtensionsOpen, setIsExtensionsOpen] = useState(false);

  const isExtensionSelected = (extension: string) => {
    return !!selectedChord?.extensions?.includes(extension);
  };

  return (
    <div className="chord-selector-extensions-container mt-5 flex w-full flex-col items-center justify-center">
      <button
        className={`${tw.TEXT_SECONDARY} mb-2 text-sm`}
        onClick={() => setIsExtensionsOpen(!isExtensionsOpen)}
      >
        Extensions
        {isExtensionsOpen ? (
          <FaCaretUp className={`${tw.TEXT_SECONDARY} -mt-1 ml-2 inline-block`} />
        ) : (
          <FaCaretDown className={`${tw.TEXT_SECONDARY} -mt-1 ml-2 inline-block`} />
        )}
      </button>
      {isExtensionsOpen && (
        <div className="chord-selector-extensions-inner-container flex max-w-72 flex-wrap justify-center">
          {CHORD_EXTENSIONS.map(({ shortName }, i) => (
            <ChordSelectorItem
              text={shortName}
              key={i + "-chord"}
              onClick={(extension) => onSelectExtension?.(extension)}
              selected={isExtensionSelected(shortName)}
              className="w-auto"
            />
          ))}
        </div>
      )}
    </div>
  );
}
