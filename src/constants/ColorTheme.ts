export interface ITailWindColorThemeClasses {
  TEXT_PRIMARY: string;
  TEXT_SECONDARY: string;
  BG_PRIMARY: string;
  BG_SECONDARY: string;
  BTN_PRIMARY: string;
  BTN_SECONDARY: string;
  BTN_DANGER: string;
  BTN_WARN: string;
  BTN_NONE: string;
}

export const TailWindColorThemeClasses = {
  light: {
    TEXT_PRIMARY: "text-slate-950",
    TEXT_SECONDARY: "text-cyan-800",
    BG_PRIMARY: "bg-slate-700",
    BG_SECONDARY: "bg-stone-800",
    BTN_PRIMARY: "bg-cyan-900 text-white",
    BTN_SECONDARY: "bg-slate-100 text-slate-950",
    BTN_DANGER: "bg-cyan-900 text-white",
    BTN_WARN: "bg-slate-100 text-white",
    BTN_NONE: "bg-transparent text-slate-950",
  },
  dark: {
    TEXT_PRIMARY: "text-white",
    TEXT_SECONDARY: "text-cyan-600",
    BG_PRIMARY: "bg-slate-700",
    BG_SECONDARY: "bg-stone-800",
    BTN_PRIMARY: "bg-cyan-900 text-white hover:bg-cyan-700",
    BTN_SECONDARY: "bg-slate-100 text-slate-950 hover:bg-slate-500",
    BTN_DANGER: "bg-cyan-900 text-white",
    BTN_WARN: "bg-slate-100 text-white",
    BTN_NONE: "bg-transparent text-white",
  },
};
