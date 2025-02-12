import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from "@headlessui/react";
import { FaHeading, FaPaintBrush } from "react-icons/fa";
import { FaEllipsis, FaPencil, FaTextSlash } from "react-icons/fa6";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { ThemedButton } from "@/components/Themed";
import { NumberInputIncremeneter } from "@/components/common/NumberInputIncrementer";
import { IOrder } from "@/interfaces/db/ISongDb";

export interface IEditSectionDropDownMenuProps {
  order: IOrder;
  showEditText: boolean;
  onEditTextClick: () => void;
  onHighlightSectionClick: () => void;
  onRepeatInputChange: (repeatCount: number) => void;
  onHideTitleClick: () => void;
}
export default function EditSectionDropDownMenu({
  order,
  showEditText,
  onEditTextClick,
  onHighlightSectionClick,
  onRepeatInputChange,
  onHideTitleClick
}: IEditSectionDropDownMenuProps) {
  return (
    <Menu>
      <MenuButton>
        <FaEllipsis />
      </MenuButton>
      <MenuItems className={`${tw.BG_PRIMARY} rounded-md p-3`} anchor="bottom end">
        {!!showEditText && (
          <MenuItem>
            <button
              onClick={onEditTextClick}
              className={`mb-2 flex gap-2 rounded-md p-2 ${tw.BTN_NONE}`}
            >
              <FaPencil className="mt-1" /> Edit Section Text
            </button>
          </MenuItem>
        )}

        <MenuItem>
          <button
            onClick={onHighlightSectionClick}
            className={`mb-2 flex gap-2 rounded-md p-2 ${tw.BTN_NONE}`}
          >
            <FaPaintBrush className="mt-1" />{" "}
            {order.isHighlighted ? "Remove Highlight" : "Highlight Section"}
          </button>
        </MenuItem>

        <MenuItem>
          <button
            onClick={onHideTitleClick}
            className={`mb-2 flex gap-2 rounded-md p-2 ${tw.BTN_NONE}`}
          >
            {order.hideTitle ? <FaHeading className="mt-1"/> : <FaTextSlash className="mt-1" />}{" "}
            {order.hideTitle ? "Show Title" : "Hide Title"}
          </button>
        </MenuItem>

        <MenuItem>
          <div
            onClick={(e) => e.preventDefault()}
            className={`flex gap-2 rounded-md pt-2 ${tw.BTN_NONE}`}
          >
            <NumberInputIncremeneter
              onChange={onRepeatInputChange}
              label="Repeat"
              defaultValue={order.repeatCount ?? 1}
              min={1}
              step={1}
              containerClassName="flex gap-2"
              labelClassName="m-0 self-center"
            />
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
