import { useThemeContext } from "@/providers/ThemeProvider";
import { FaPlus } from "react-icons/fa";

export function CirclePlusButton({ onClick }: { onClick: () => void }) {
  const { twColorClasses } = useThemeContext();

  return (
    <button
      onClick={onClick}
      className={`rounded-full p-2 ${twColorClasses.BTN_PRIMARY}`}
    >
      <FaPlus />
    </button>
  );
}
