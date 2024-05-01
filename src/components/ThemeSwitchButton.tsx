"use client";
import { useThemeContext } from "@/providers/ThemeProvider";
import { ThemedButton } from "./Themed";
import { ButtonHTMLAttributes } from "react";

export default function ThemeSwitchButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { theme, switchTheme } = useThemeContext();
  return (
    <ThemedButton
      {...props}
      text={`Switch To ${theme === "dark" ? "light" : "dark"}`}
      color="secondary"
      onClick={switchTheme}
    ></ThemedButton>
  );
}
