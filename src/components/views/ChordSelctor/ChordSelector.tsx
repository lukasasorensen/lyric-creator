import { ThemedButton } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { NATURALS, SHARPS, CHORD_EXTENSIONS, FLATS } from "@/constants/Notes";
import { IChord } from "@/interfaces/db/ISongDb";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
export default function ChordSelector({
  onSelect,
  onChordChange,
  onCancel,
  initialChord,
  enableExtensions = true,
}: {
  onSelect: (chord: IChord) => void;
  onChordChange: (chord: IChord) => void;
  onCancel: () => void;
  initialChord?: IChord;
  enableExtensions?: boolean;
}) {
  const [selectedChord, setSelectedChord] = useState(
    initialChord || ({ letter: "A" } as IChord),
  );
  const [sharpsOrFlats, setSharpsOrFlats] = useState<"sharps" | "flats">("sharps");
  const [isChordTextInputFocused, setIsChordTextInputFocused] = useState(false);
  const [isCustomChordInputShown, setIsCustomChordInputShown] = useState(false);
  const notePreview = useMemo(() => {
    if (selectedChord?.customChord?.length) return selectedChord?.customChord;
    if (!selectedChord?.letter) return "";
    let notePreview = selectedChord.letter;
    if (selectedChord?.quality) notePreview += selectedChord.quality;
    if (selectedChord?.extensions?.length)
      notePreview += selectedChord.extensions.join("");
    return notePreview;
  }, [selectedChord]);

  const onSelectNote = (note: string) => {
    selectedChord.letter = note;
    updateChord({ ...selectedChord });
  };

  const updateChord = useCallback(
    (chord: IChord) => {
      setSelectedChord({ ...chord });
      onChordChange(chord);
    },
    [setSelectedChord, onChordChange],
  );

  const onDoubleClickNote = (note: string) => {
    onSelectNote(note);
    onSelect(selectedChord);
  };

  const setSelectedQuality = (quality: string) => {
    selectedChord.quality = quality;
    updateChord({ ...selectedChord });
  };

  const isExtensionSelected = useCallback(
    (extension: string) => {
      return !!selectedChord?.extensions?.includes(extension);
    },
    [selectedChord],
  );

  const setSelectedExtension = useCallback(
    (extension: string) => {
      selectedChord.extensions ??= [];
      if (isExtensionSelected(extension)) {
        selectedChord.extensions = selectedChord.extensions.filter(
          (e) => e !== extension,
        );
      } else {
        selectedChord.extensions.push(extension);
      }
      updateChord({ ...selectedChord });
    },
    [updateChord, selectedChord, isExtensionSelected],
  );

  const handleWindowKeydownEvent = useCallback(
    (event: KeyboardEvent<Window>) => {
      if (isChordTextInputFocused) return;
      event.stopPropagation();
      event.preventDefault();
      if (!event?.key) return;
      const key = event.key;
      console.log(key);

      const note = NATURALS.find((note) => note.letter === key.toUpperCase());
      if (note?.letter && key !== "b") {
        selectedChord.letter = note.letter;
      }

      switch (key.toLowerCase()) {
        case "enter":
          onSelect(selectedChord);
          return;
        case "#":
          selectedChord.letter = selectedChord.letter[0];
          selectedChord.letter += key;
          setSharpsOrFlats("sharps");
          break;
        case "b":
          selectedChord.letter = selectedChord.letter[0];
          selectedChord.letter += key;
          setSharpsOrFlats("flats");
          break;
        case "7":
        case "6":
        case "4":
        case "2":
        case "9":
        case "5":
          if (!enableExtensions) return;
          setSelectedExtension(key);
          break;
      }

      updateChord({ ...selectedChord });
    },
    [
      selectedChord,
      setSharpsOrFlats,
      setSelectedExtension,
      onSelect,
      isChordTextInputFocused,
      enableExtensions,
      updateChord,
    ],
  );

  let onChordTextInputChangeDebounceTimer: Timeout;
  const onChordTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const chordText = e.target.value;
    console.log(chordText);
    selectedChord.customChord = chordText;
    setSelectedChord({ ...selectedChord });
    if (onChordTextInputChangeDebounceTimer)
      clearTimeout(onChordTextInputChangeDebounceTimer);
    onChordTextInputChangeDebounceTimer = setTimeout(() => {
      onChordChange(selectedChord);
    }, 100);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleWindowKeydownEvent);
    return () => {
      window.removeEventListener("keydown", handleWindowKeydownEvent);
    };
  }, [handleWindowKeydownEvent]);

  return (
    <div className="chord-selector-container">
      {isCustomChordInputShown ? (
        <input
          onFocus={() => setIsChordTextInputFocused(true)}
          onBlur={() => setIsChordTextInputFocused(false)}
          className={`${tw.TEXT_SECONDARY} mb-4 w-20 rounded-md border-none bg-transparent text-center text-2xl font-bold`}
          onChange={onChordTextInputChange}
          value={notePreview}
        />
      ) : (
        <h2 className={`${tw.TEXT_SECONDARY} mb-4 text-center text-2xl font-bold`}>
          {notePreview}
        </h2>
      )}

      <NoteSelector
        sharpsOrFlats={sharpsOrFlats}
        selectedChord={selectedChord}
        onSelectNote={onSelectNote}
      />

      <ChordQualitySelector
        onSelectQuality={setSelectedQuality}
        selectedChord={selectedChord}
      />

      {!!enableExtensions && (
        <ChordExtensionsSelector
          onSelectExtension={setSelectedExtension}
          selectedChord={selectedChord}
        />
      )}

      <ThemedButton
        className="mt-3"
        text="Select"
        color="primary"
        onClick={() => onSelect(selectedChord)}
      />
    </div>
  );
}

export function NoteSelector({
  onSelectNote,
  selectedChord,
  sharpsOrFlats,
}: {
  onSelectNote: (note: string) => void;
  selectedChord: IChord;
  sharpsOrFlats: string;
}) {
  return (
    <div className="note-selector-container text-center">
      <div className="chord-selector-sharps-container flex justify-between px-9">
        {(sharpsOrFlats === "sharps" ? SHARPS : FLATS).map(({ letter }, i) => (
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
    </div>
  );
}

export function ChordQualitySelector({
  onSelectQuality,
  selectedChord,
}: {
  selectedChord: IChord;
  onSelectQuality: (quality: string) => void;
}) {
  const isMajor = (quality: string | undefined) => {
    if (!quality) return true;
    return ["", "maj", "major"].includes(quality.toLowerCase());
  };

  return (
    <div className="chord-selector-major-minor mt-4">
      <button
        className={`chord-selector-chord m-2 px-4 py-1 text-center text-sm ${tw.BTN_PRIMARY_BORDER} rounded-md ${!!isMajor(selectedChord?.quality) && "bg-violet-700"}`}
        onClick={() => onSelectQuality("")}
      >
        Major
      </button>
      <button
        className={`chord-selector-chord m-2 px-4 py-1 text-center text-sm ${tw.BTN_PRIMARY_BORDER} rounded-md ${!isMajor(selectedChord?.quality) && "bg-violet-700"}`}
        onClick={() => onSelectQuality("m")}
      >
        Minor
      </button>
    </div>
  );
}

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

export function ChordSelectorItem({
  text,
  onClick,
  onDoubleClick,
  className,
  selected,
}: {
  text: string;
  className?: string;
  onClick: (text: string) => void;
  onDoubleClick?: (text: string) => void;
  selected?: boolean;
}) {
  return (
    <button
      className={`chord-selector-chord m-2 w-10 p-2 text-center  ${tw.BTN_PRIMARY_BORDER} rounded-md text-xs ${className} ${!!selected && "bg-violet-700"}`}
      onClick={() => onClick(text)}
      onDoubleClick={() => onDoubleClick?.(text)}
    >
      {text}
    </button>
  );
}
