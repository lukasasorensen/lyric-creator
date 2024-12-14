import { useThemeContext } from "@/providers/ThemeProvider";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ButtonHTMLAttributes } from "react";

export interface ICircleButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
}
export function CirclePlusButton(props: ICircleButton) {
  return (
    <button
      {...props}
      className={`rounded-full p-2 ${tw.BTN_PRIMARY} ${props.className}`}
    >
      <FaPlus size={props.size ?? 12} />
    </button>
  );
}

export function CircleMinusButton(props: ICircleButton) {
  return (
    <button {...props} className={`rounded-full p-2 ${tw.BTN_DANGER} ${props.className}`}>
      <FaMinus size={props.size ?? 12} />
    </button>
  );
}
