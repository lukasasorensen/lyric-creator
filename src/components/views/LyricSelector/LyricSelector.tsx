"use client";

import { ILyricsDb } from "@/interfaces/db/ILyricsDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import LyricsList from "./LyricList";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
export interface ILyricSelectorProps {
  lyrics: ILyricsDb[];
  isLoading: boolean;
}

export function LyricListItem({
  lyrics,
  loading,
}: {
  lyrics?: ILyricsDb;
  loading?: boolean;
}) {
  return (
    <Link href={`/editor/${lyrics?._id}`}>
      <li
        className={`mb-2 flex justify-between gap-x-6 rounded-md px-10 py-5 ${tw.BG_SECONDARY}`}
        key={lyrics?._id}
      >
        <div className={`flex min-w-0 gap-x-4`}>
          <div className={`min-w-0 flex-auto`}>
            <p className={`text-sm font-semibold leading-6 ${tw.TEXT_PRIMARY}`}>
              {loading ? <Skeleton width={100} /> : lyrics?.title}
            </p>
            <p className={`mt-1 truncate text-xs leading-5 ${tw.TEXT_SECONDARY}`}>
              {loading ? <Skeleton width={80} /> : lyrics?.artist}
            </p>
          </div>
        </div>
        <div className={`hidden shrink-0 sm:flex sm:flex-col sm:items-end`}>
          <p className={`mt-1 text-xs leading-5 ${tw.TEXT_SECONDARY}`}>
            {loading ? (
              <Skeleton width={100} />
            ) : (
              new Date(lyrics?.createdAt).toDateString()
            )}
          </p>
        </div>
      </li>
    </Link>
  );
}

export default function LyricSelector(props: ILyricSelectorProps) {
  return (
    <div className={`lyric-selector w-full max-w-screen-lg p-5`}>
      {props.isLoading && <LyricListItem loading={true} />}
      <ul role="list" className={`divide-y divide-gray-100`}>
        {!!props.lyrics?.length &&
          props.lyrics.map((lyrics) => (
            <LyricListItem lyrics={lyrics} key={lyrics._id} />
          ))}
      </ul>
    </div>
  );
}
