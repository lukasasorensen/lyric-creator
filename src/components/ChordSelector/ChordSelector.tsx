import { ThemedButton } from "@/components/Themed";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { NATURALS, SHARPS, CHORD_EXTENSIONS, FLATS } from "@/constants/Notes";
import { IChord } from "@/interfaces/db/ISongDb";
import { isMajor } from "@/utils/ChordUtil";
import { getChordSuggestionsForKey } from "@/utils/SongKeyUtil";
import debounce from "lodash/debounce";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { NoteSelector } from "./NoteSelector";
import { SongKeyChordSuggestions } from "./SongKeyChordSuggestions";
import { ChordQualitySelector } from "./ChordQualitySelector";
import { ChordExtensionsSelector } from "./ChordExtensionsSelector";

export interface IChordSelectorProps {
  onSelect?: (chord: IChord) => void;
  onChordChange?: (chord: IChord) => void;
  onDeleteChord?: (chord: IChord) => void;
  onCancel?: () => void;
  initialChord?: IChord;
  enableExtensions?: boolean;
  songKey?: IChord | null;
  showSuggestions?: boolean;
  showSelectButton?: boolean;
  selectButtonLabel?: string;
  showHorizontalShift?: boolean;
}

export default function ChordSelector({
  onSelect,
  onChordChange,
  onCancel,
  onDeleteChord,
  initialChord,
  songKey,
  enableExtensions = true,
  showSuggestions = false,
  showSelectButton = false,
  selectButtonLabel = "Select",
}: IChordSelectorProps) {
  const [selectedChord, setSelectedChord] = useState(
    initialChord || (songKey ?? ({ letter: "A" } as IChord)),
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
      onChordChange?.(chord);
    },
    [onChordChange],
  );

  const deleteChord = useCallback(() => {
    selectedChord.letter = "";
    delete selectedChord.quality;
    delete selectedChord.extensions;
    delete selectedChord.customChord;
    setSelectedChord({ ...selectedChord });
    onDeleteChord?.(selectedChord);
  }, [onDeleteChord, selectedChord]);

  const onDoubleClickNote = (note: string) => {
    onSelectNote(note);
    onSelect?.(selectedChord);
  };

  const setSelectedQuality = useCallback(
    (quality: string) => {
      selectedChord.quality = quality;
      updateChord({ ...selectedChord });
    },
    [selectedChord, updateChord],
  );

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
      const lowerCaseKey = key.toLowerCase();

      const note = NATURALS.find((note) => note.letter === key.toUpperCase());
      if (note?.letter && key !== "b") {
        selectedChord.letter = note.letter;
        updateChord(selectedChord);
        return;
      }

      if (lowerCaseKey === "enter") {
        onSelect?.(selectedChord);
        return;
      }

      if (lowerCaseKey === "#") {
        selectedChord.letter = selectedChord.letter[0];
        selectedChord.letter += key;
        setSharpsOrFlats("sharps");
        updateChord({ ...selectedChord });
        return;
      }

      if (key === "b") {
        selectedChord.letter = selectedChord.letter[0];
        selectedChord.letter += key;
        setSharpsOrFlats("flats");
        updateChord({ ...selectedChord });
        return;
      }

      if (key === "m") {
        setSelectedQuality("m");
        return;
      }

      if (key === "M") {
        setSelectedQuality("");
        return;
      }

      if (lowerCaseKey === "backspace") {
        deleteChord();
        return;
      }

      switch (key) {
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
    },
    [
      selectedChord,
      setSharpsOrFlats,
      setSelectedExtension,
      onSelect,
      isChordTextInputFocused,
      enableExtensions,
      updateChord,
      deleteChord,
      setSelectedQuality,
    ],
  );

  const onChordTextInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const chordText = e.target.value;
    console.log(chordText);
    selectedChord.customChord = chordText;
    setSelectedChord({ ...selectedChord });
    onChordChange?.(selectedChord);
  }, 100);

  const onSelectButtonClick = () => {
    onSelect?.(selectedChord);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleWindowKeydownEvent);
    return () => {
      window.removeEventListener("keydown", handleWindowKeydownEvent);
    };
  }, [handleWindowKeydownEvent]);

  return (
    <div className="chord-selector-container">
      <div className="container mb-4 flex justify-center">
        {isCustomChordInputShown ? (
          <input
            onFocus={() => setIsChordTextInputFocused(true)}
            onBlur={() => setIsChordTextInputFocused(false)}
            className={`${tw.TEXT_SECONDARY} w-20 rounded-md border-none bg-transparent text-center text-2xl font-bold`}
            onChange={onChordTextInputChange}
            value={notePreview}
          />
        ) : (
          <h2
            className={`${tw.TEXT_SECONDARY} rounded-md border border-violet-500 px-5 py-2 text-center text-2xl font-bold`}
          >
            {notePreview}
          </h2>
        )}
      </div>

      {!!showSuggestions && !!songKey && (
        <div className="mb-4">
          <p className={`${tw.TEXT_PRIMARY} text-xs`}>Suggestions</p>
          <SongKeyChordSuggestions
            onSelectNote={onSelectNote}
            songKey={songKey}
            selectedChord={selectedChord}
          />
        </div>
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

      {!!showSelectButton && (
        <ThemedButton
          className="mt-5"
          color="primary"
          text={selectButtonLabel}
          onClick={onSelectButtonClick}
        />
      )}
    </div>
  );
}
