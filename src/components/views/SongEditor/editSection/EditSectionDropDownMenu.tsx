import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from "@headlessui/react";
import { FaPaintBrush } from "react-icons/fa";
import { FaEllipsis, FaPencil } from "react-icons/fa6";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ThemedButton } from "@/components/Themed";

export interface IEditSectionDropDownMenuProps {
  onEditTextClick: () => void;
  onEditStyleClick: () => void;
}
export default function EditSectionDropDownMenu({
  onEditTextClick,
  onEditStyleClick,
}: IEditSectionDropDownMenuProps) {
  return (
    <Menu>
      <MenuButton>
        <FaEllipsis />
      </MenuButton>
      <MenuItems className={`${tw.BG_PRIMARY} rounded-md p-3`} anchor="bottom end">
        <MenuItem>
          <ThemedButton onClick={onEditTextClick} className={`mb-2 flex gap-2 p-2`}>
            <FaPencil className="mt-1" /> Edit Section Text
          </ThemedButton>
        </MenuItem>

        <MenuItem>
          <ThemedButton onClick={onEditStyleClick} className={`flex gap-2 p-2`}>
            <FaPaintBrush className="mt-1" /> Change Section Style
          </ThemedButton>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
