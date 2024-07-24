"use client";

import { ILyricsDb } from "@/interfaces/db/ILyricsDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import LyricsList from "./LyricList";
import Link from "next/link";
import { ILyricsDb } from "@/interfaces/db/ILyricsDb";
export interface ILyricSelectorProps {
  lyrics: ILyricsDb[];
}

export function LyricListItem({ lyrics }: { lyrics: ILyricsDb }) {
  return (
    <Link href={`/editor/${lyrics._id}`}>
      <li className={`flex justify-between gap-x-6 py-5`} key={lyrics._id}>
        <div className={`flex min-w-0 gap-x-4`}>
          <div className={`min-w-0 flex-auto`}>
            <p className={`text-sm font-semibold leading-6 text-gray-900`}>
              {lyrics.title}
            </p>
            <p className={`mt-1 truncate text-xs leading-5 text-gray-500`}>
              Created by Lukas
            </p>
          </div>
        </div>
        <div className={`hidden shrink-0 sm:flex sm:flex-col sm:items-end`}>
          <p className={`mt-1 text-xs leading-5 text-gray-500`}>12-1-2024</p>
        </div>
      </li>
    </Link>
  );
}

export default function LyricSelector(props: ILyricSelectorProps) {
  return (
    <ul role="list" className={`divide-y divide-gray-100`}>
      {props.lyrics?.length &&
        props.lyrics.map((lyrics) => (
          <LyricListItem lyrics={lyrics} key={lyrics._id} />
        ))}
    </ul>
  );
}
