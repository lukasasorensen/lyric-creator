import { useThemeContext } from "@/providers/ThemeProvider";
import { FaPlus } from "react-icons/fa";
import { ReactNode, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export function PopoverList({ children }: { children: ReactNode }) {
  const { twColorClasses } = useThemeContext();
  return (
    <Popover className="relative">
      <PopoverButton className={`rounded-full p-2 ${twColorClasses.BTN_PRIMARY}`}>
        <FaPlus />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className={`divide-y divide-white/5 rounded-xl ${twColorClasses.BG_PRIMARY} ${twColorClasses.TEXT_PRIMARY} min-w-56 text-sm/6 drop-shadow-lg`}
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}

export function PopoverListItemButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  const { twColorClasses } = useThemeContext();

  return (
    <div className="p-3">
      <button className="block w-full rounded-lg px-3 py-2 transition hover:bg-white/5">
        <p
          className={`font-semibold ${twColorClasses.TEXT_PRIMARY} w-full text-center`}
          onClick={onClick}
        >
          {text}
        </p>
      </button>
    </div>
  );
}
