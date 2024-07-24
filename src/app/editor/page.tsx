import { getLyrics } from "@/clients/lyricClient";
import LyricSelector from "@/components/views/LyricSelector/LyricSelector";
import { ILyricsDb } from "@/interfaces/db/ILyricsDb";

export default async function LyricEditorSelector() {
  const allLyrics: ILyricsDb[] = await getLyrics();

  return (
    <main className="lyrics-container w-full flex justify-center">
      {allLyrics?.length && <LyricSelector lyrics={allLyrics} />}
    </main>
  );
}
