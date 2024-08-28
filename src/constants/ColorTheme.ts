export interface ITailWindColorThemeClasses {
  TEXT_PRIMARY: string;
  TEXT_SECONDARY: string;
  TEXT_TERTIARY: string;
  TEXT_DANGER: string;
  TEXT_WARN: string;
  BG_PRIMARY: string;
  BG_SECONDARY: string;
  BG_TERTIARY: string;
  BTN_PRIMARY: string;
  BTN_PRIMARY_BORDER: string;
  BTN_SECONDARY: string;
  BTN_SECONDARY_BORDER: string;
  BTN_DANGER: string;
  BTN_DANGER_SECONDARY: string;
  BTN_WARN: string;
  BTN_WARN_SECONDARY: string;
  BTN_NONE: string;
}

export const TailWindColorThemeClasses: ITailWindColorThemeClasses = {
  TEXT_PRIMARY: "text-slate-950 dark:text-white",
  TEXT_SECONDARY: "text-cyan-800 dark:text-cyan-600",
  TEXT_TERTIARY: "text-violet-800 dark:text-violet-500",
  TEXT_DANGER: "text-rose-700",
  TEXT_WARN: "text-amber-400 dark:text-orange-400",
  BG_PRIMARY: "bg-slate-300 dark:bg-slate-700",
  BG_SECONDARY: "bg-slate-500 dark:bg-gray-800",
  BG_TERTIARY: "bg-violet-600 dark:bg-violet-600",
  BTN_PRIMARY:
    "bg-violet-600 text-white dark:bg-violet-600 dark:text-white dark:hover:bg-violet-700",
  BTN_PRIMARY_BORDER:
    "bg-transparent border-violet-600 text-white dark:border-violet-600 dark:text-white dark:hover:bg-violet-600 border-2",
  BTN_SECONDARY:
    "bg-cyan-900 text-white dark:bg-cyan-900 dark:text-white dark:hover:bg-violet-500",
  BTN_SECONDARY_BORDER:
    "bg-transparent border-cyan-900 text-white dark:bg-cyan-900 dark:text-white dark:hover:bg-violet-500 border-2",
  BTN_DANGER: "bg-rose-700 text-white",
  BTN_DANGER_SECONDARY: "text-rose-700 bg-transparent",
  BTN_WARN: "bg-amber-400 text-white dark:bg-orange-400 dark:text-white",
  BTN_WARN_SECONDARY: "text-yellow-500 dark:text-orange-500 bg-transparent",
  BTN_NONE: "bg-transparent text-slate-950 dark:bg-transparent dark:text-white",
};
