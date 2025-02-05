import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

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
      className={`chord-selector-chord m-2 w-10 rounded-md p-2 ${tw.BTN_SECONDARY_BORDER} text-center text-xs ${className} ${!!selected && "bg-cyan-900 dark:bg-cyan-700"}`}
      onClick={() => onClick(text)}
      onDoubleClick={() => onDoubleClick?.(text)}
    >
      {text}
    </button>
  );
}
