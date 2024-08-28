import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { NATURALS, SHARPS, CHORD_EXTENSIONS, CHORD_QUALITIES } from "@/constants/Notes";
import { IChord } from "@/interfaces/db/ISongDb";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
export default function ChordSelector({
  onSelect,
  selectedChord,
}: {
  onSelect: (chord: IChord) => void;
  selectedChord?: Partial<IChord> | undefined;
}) {
  const [selectedQuality, setSelectedQuality] = useState(selectedChord?.quality ?? "");
  const [selectedExtension, setSelectedExtension] = useState(
    selectedChord?.extension ?? "",
  );
  const [isExtensionsOpen, setIsExtensionsOpen] = useState(false);

  const onSelectNote = (note: string) => {
    onSelect({ letter: note, quality: selectedQuality, extension: selectedExtension });
  };

  const isMajor = (quality: string | undefined) => {
    if (!quality) return true;
    return ["", "maj", "major"].includes(quality.toLowerCase());
  };

  return (
    <div className="chord-selector-container">
      <div className="chord-selector-sharps-container flex justify-between px-9">
        {SHARPS.map(({ letter }, i) => (
          <ChordSelectorItem
            className={i === 1 ? "mr-16" : ""}
            text={letter}
            key={i + "-chord"}
            onClick={(note) => onSelectNote(note)}
            selected={selectedChord?.letter === letter}
          />
        ))}
      </div>
      <div className="chord-selector-naturals-container flex justify-between">
        {NATURALS.map(({ letter }, i) => (
          <ChordSelectorItem
            text={letter}
            key={i + "-chord"}
            onClick={(note) => onSelectNote(note)}
            selected={selectedChord?.letter === letter}
          />
        ))}
      </div>
      <div className="chord-selector-major-minor mb-4">
        <button
          className={`chord-selector-chord m-2 px-4 py-1 text-center text-sm ${tw.BTN_PRIMARY_BORDER} rounded-md ${!!isMajor(selectedQuality) && "bg-violet-700"}`}
          onClick={() => setSelectedQuality("Maj")}
        >
          Major
        </button>
        <button
          className={`chord-selector-chord m-2 px-4 py-1 text-center text-sm ${tw.BTN_PRIMARY_BORDER} rounded-md ${!isMajor(selectedQuality) && "bg-violet-700"}`}
          onClick={() => setSelectedQuality("m")}
        >
          Minor
        </button>
      </div>
      <div className="chord-selector-extensions-container mt-5 flex w-full flex-col items-center justify-center">
        <button
          className={`${tw.TEXT_SECONDARY} text-md mb-2`}
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
                onClick={(extension) => setSelectedExtension(extension)}
                selected={selectedChord?.extension === shortName}
                className="w-auto"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ChordSelectorItem({
  text,
  onClick,
  className,
  selected,
}: {
  text: string;
  className?: string;
  onClick: (text: string) => void;
  selected?: boolean;
}) {
  return (
    <button
      className={`chord-selector-chord m-2 w-10 p-2 text-center  ${tw.BTN_PRIMARY_BORDER} rounded-md text-xs ${className} ${!!selected && "bg-violet-700"}`}
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
}
