"use client";
import { useThemeContext } from "@/providers/ThemeProvider";
import { ReactNode } from "react";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export function Body({ children }: { children: ReactNode }) {
  const { theme } = useThemeContext();
  return (
    <div
      className={`${theme === "dark" ? "dark" : "light"} ${tw.BG_PRIMARY} min-h-screen w-full`}
    >
      {children}
    </div>
  );
}
