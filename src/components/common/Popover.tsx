import { ILyrics } from "@/interfaces/Lyrics";
import { useThemeContext } from "@/providers/ThemeProvider";
import { FaPlus } from "react-icons/fa";
import { CirclePlusButton } from "./CirclePlusButton";
import { ReactNode, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export function PopoverList({ children }: { children: ReactNode }) {
  const { twColorClasses } = useThemeContext();
  return (
    <Popover className="relative">
      <PopoverButton className={`rounded-full p-2 ${twColorClasses.BTN_PRIMARY}`}><FaPlus /></PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className={`divide-y divide-white/5 rounded-xl ${twColorClasses.BG_PRIMARY} ${twColorClasses.TEXT_PRIMARY} text-sm/6 min-w-56 drop-shadow-lg`}
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}

export function PopoverListItemButton({ text, onClick }: { text: string, onClick?: () => void }) {
  const { twColorClasses } = useThemeContext();

  return (
    <div className="p-3">
      <button className="block rounded-lg px-3 py-2 transition hover:bg-white/5 w-full">
        <p className={`font-semibold ${twColorClasses.TEXT_PRIMARY} text-center w-full`} onClick={onClick}>{text}</p>
      </button>
    </div>
  );
}
