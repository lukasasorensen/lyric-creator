import { ILyrics } from "@/interfaces/ui/ILyricsUi";

export function LyricListItem({ lyrics }: { lyrics: ILyrics }) {
  return (
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
  );
}

export default function LyricsList({ lyricsResults }: { lyricsResults: ILyrics[] }) {
  return (
    <ul role="list" className={`divide-y divide-gray-100`}>
      {lyricsResults?.length &&
        lyricsResults.map((lyrics) => <LyricListItem lyrics={lyrics} key={lyrics._id} />)}
    </ul>
  );
}
