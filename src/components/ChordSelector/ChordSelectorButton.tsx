import ChordSelector, { IChordSelectorProps } from "./ChordSelector";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { FaPlus } from "react-icons/fa";
import { IChord } from "@/interfaces/db/ISongDb";

export interface IChordSelectorButtonProps extends IChordSelectorProps {
  closeOnSelect?: boolean;
}

export default function ChordSelectorButton(props: IChordSelectorButtonProps) {
  return (
    <Popover>
      {({ close }) => {
        return (
          <>
            <PopoverButton
              className={`rounded-full p-1 text-center ${tw.BTN_PRIMARY}`}
              onClick={close}
            >
              <FaPlus size={12} />
            </PopoverButton>
            <PopoverPanel
              anchor="top"
              className={`flex justify-center p-4 ${tw.BG_SECONDARY} rounded-md border-2 border-slate-300 dark:border-slate-600`}
            >
              <div className="flex flex-col text-center">
                <ChordSelector
                  {...props}
                  onSelect={(chord: IChord) => {
                    props?.onSelect?.(chord);
                    !!props.closeOnSelect ? close() : () => {};
                  }}
                />
              </div>
            </PopoverPanel>
          </>
        );
      }}
    </Popover>
  );
}
