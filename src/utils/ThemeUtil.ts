import { ITailWindColorThemeClasses } from "@/constants/ColorTheme";

export function getButtonThemeClasses(
  colorTheme:
    | "primary"
    | "secondary"
    | "warn"
    | "warn-secondary"
    | "danger"
    | "danger-secondary"
    | "none",
  twColorClasses: ITailWindColorThemeClasses,
) {
  switch (colorTheme) {
    case "primary":
      return twColorClasses.BTN_PRIMARY;
    case "secondary":
      return twColorClasses.BTN_SECONDARY;
    case "warn":
      return twColorClasses.BTN_WARN;
    case "warn-secondary":
      return twColorClasses.BTN_WARN_SECONDARY;
    case "danger":
      return twColorClasses.BTN_DANGER;
    case "danger-secondary":
      return twColorClasses.BTN_DANGER_SECONDARY;
    case "none":
    default:
      return twColorClasses.BTN_NONE;
  }
}
