import { TailWindColorThemeClasses } from "@/constants/ColorTheme";
import { ReactNode, createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  twColorClasses: TailWindColorThemeClasses.dark,
});

export function useThemeContext() {
  const value = useContext(ThemeContext);
  return value;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("dark");
  const [tailWindColorThemeClasses, setTailWindColorThemeClasses] = useState(
    TailWindColorThemeClasses.dark,
  );

  const value = {
    theme,
    twColorClasses: tailWindColorThemeClasses,
    setTheme: (theme: "dark" | "light") => {
      setTheme(theme);
      setTailWindColorThemeClasses(TailWindColorThemeClasses[theme]);
    },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
