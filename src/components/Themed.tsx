import { getButtonThemeClasses } from "@/utils/ThemeUtil";
import { ButtonHTMLAttributes, InputHTMLAttributes, useMemo } from "react";
import { TailWindColorThemeClasses as twColorClasses } from "@/constants/ColorTheme";
import { Switch, SwitchProps } from "@headlessui/react";

interface IThemedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  title?: string;
  fill?: boolean;
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
  fill,
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
      className={`block w-full rounded-lg border border-gray-300 ${twColorClasses.BG_SECONDARY} ${twColorClasses.TEXT_PRIMARY} bg-white p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${props?.className}`}
    />
  );
}

interface IThemedToggleProps extends SwitchProps {}
export function ThemedToggle(props: IThemedToggleProps) {
  return (
    <Switch
      {...props}
      className={`group inline-flex h-6 w-11 items-center rounded-full border-2 border-violet-800 bg-transparent transition data-[checked]:bg-violet-800 ${props.className}`}
    >
      <span
        className={`size-4 translate-x-1 rounded-full ${twColorClasses.BG_TERTIARY} transition group-data-[checked]:translate-x-6`}
      />
    </Switch>
  );
}
