"use client";
import {
  ITailWindColorThemeClasses,
  TailWindColorThemeClasses,
} from "@/constants/ColorTheme";
import { ReactNode, createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  twColorClasses: TailWindColorThemeClasses.dark,
  switchTheme: () => {},
});

export function useThemeContext() {
  const value = useContext(ThemeContext);
  return value;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("dark");
  const [tailWindColorThemeClasses, setTailWindColorThemeClasses] =
    useState<ITailWindColorThemeClasses>(TailWindColorThemeClasses.dark);

  const value = {
    theme,
    twColorClasses: tailWindColorThemeClasses,
    switchTheme: () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      setTailWindColorThemeClasses(TailWindColorThemeClasses[newTheme]);
    },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
