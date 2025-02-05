import { IChord } from "@/interfaces/db/ISongDb";
import { isMajor } from "@/utils/ChordUtil";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export function ChordQualitySelector({
  onSelectQuality,
  selectedChord,
}: {
  selectedChord: IChord;
  onSelectQuality: (quality: string) => void;
}) {
  return (
    <div className="chord-selector-major-minor mt-4">
      <button
        className={`chord-selector-chord m-2 px-4 py-1 text-center text-sm ${tw.BTN_SECONDARY_BORDER} rounded-md ${!!isMajor(selectedChord?.quality) && "bg-cyan-900 dark:bg-cyan-700"}`}
        onClick={() => onSelectQuality("")}
      >
        Major
      </button>
      <button
        className={`chord-selector-chord m-2 px-4 py-1 text-center text-sm ${tw.BTN_SECONDARY_BORDER} rounded-md ${!isMajor(selectedChord?.quality) && "bg-cyan-900 dark:bg-cyan-700"}`}
        onClick={() => onSelectQuality("m")}
      >
        Minor
      </button>
    </div>
  );
}
