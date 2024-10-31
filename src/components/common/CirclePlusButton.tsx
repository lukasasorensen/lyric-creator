import { useThemeContext } from "@/providers/ThemeProvider";
import { FaPlus } from "react-icons/fa";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ButtonHTMLAttributes } from "react";

export interface ICirclePlusButton extends ButtonHTMLAttributes<HTMLButtonElement> {}
export function CirclePlusButton(props: ICirclePlusButton) {
  return (
    <button
      {...props}
      className={`rounded-full p-2 ${tw.BTN_PRIMARY} ${props.className}`}
    >
      <FaPlus />
    </button>
  );
}
