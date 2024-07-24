import { FaSpinner } from "react-icons/fa";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function LoadingDisplay({ text }: { text?: string }) {
  return (
    <div className="flex flex-col justify-center text-center">
      <div className={`flex w-full justify-center ${tw.TEXT_PRIMARY}`}>
        <FaSpinner className="animate-spin" />
      </div>
      {text && <p className={`mt-2 ${tw.TEXT_PRIMARY}`}>{text}</p>}
    </div>
  );
}
