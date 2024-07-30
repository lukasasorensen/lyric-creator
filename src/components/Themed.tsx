import { getButtonThemeClasses } from "@/utils/ThemeUtil";
import { ButtonHTMLAttributes, InputHTMLAttributes, useMemo } from "react";
import { TailWindColorThemeClasses as twColorClasses } from "@/constants/ColorTheme";

interface IThemedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  title?: string;
  color?:
    | "primary"
    | "secondary"
    | "warn"
    | "warn-secondary"
    | "danger"
    | "danger-secondary"
    | "none";
}
export function ThemedButton({
  title,
  text,
  color,
  className,
  ...props
}: IThemedButtonProps) {
  const buttonThemeClasses = useMemo<string>(() => {
    return getButtonThemeClasses(color || "none", twColorClasses);
  }, [color]);

  return (
    <button
      {...props}
      className={`w-fit min-w-24 rounded-md px-5 py-1.5 text-center ${buttonThemeClasses} ${className}`}
      title={title ?? text}
    >
      {text}
    </button>
  );
}

interface IThemedTextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function ThemedTextInput(props: IThemedTextInputProps) {
  return (
    <input
      {...props}
      type="text"
      className={`block w-full rounded-lg border border-gray-300 ${twColorClasses.BG_SECONDARY} ${twColorClasses.TEXT_PRIMARY} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${props?.className}`}
    />
  );
}
