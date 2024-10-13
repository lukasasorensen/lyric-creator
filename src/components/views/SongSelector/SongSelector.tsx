"use client";

import { ISongDb } from "@/interfaces/db/ISongDb";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
export interface ISongSelectorProps {
  songs: ISongDb[];
  isLoading: boolean;
}

export function SongListItem({ song, loading }: { song?: ISongDb; loading?: boolean }) {
  return (
    <Link href={`/my-songs/edit/${song?._id}`}>
      <li
        className={`mb-2 flex justify-between gap-x-6 rounded-md px-10 py-5 ${tw.BG_SECONDARY}`}
        key={song?._id}
      >
        <div className={`flex min-w-0 gap-x-4`}>
          <div className={`min-w-0 flex-auto`}>
            <p className={`text-sm font-semibold leading-6 ${tw.TEXT_PRIMARY}`}>
              {loading ? <Skeleton width={100} /> : song?.title}
            </p>
            <p className={`mt-1 truncate text-xs leading-5 ${tw.TEXT_SECONDARY}`}>
              {loading ? <Skeleton width={80} /> : song?.artist}
            </p>
          </div>
        </div>
        <div className={`hidden shrink-0 sm:flex sm:flex-col sm:items-end`}>
          <p className={`mt-1 text-xs leading-5 ${tw.TEXT_SECONDARY}`}>
            {loading ? (
              <Skeleton width={100} />
            ) : (
              !!song?.createdAt && new Date(song?.createdAt).toDateString()
            )}
          </p>
        </div>
      </li>
    </Link>
  );
}

export default function SongSelector(props: ISongSelectorProps) {
  return (
    <div className={`song-selector w-full max-w-screen-lg p-5`}>
      {props.isLoading && <SongListItem loading={true} />}
      <ul role="list" className={`divide-y divide-gray-100`}>
        {!!props.songs?.length &&
          props.songs.map((song) => <SongListItem song={song} key={song._id} />)}
      </ul>
    </div>
  );
}
