import { getLyrics } from "@/clients/lyricClient";
import LyricSelector from "@/components/views/LyricSelector/LyricSelector";
import { ILyricsUi } from "@/interfaces/ui/ILyricsUi";

export default async function LyricEditorSelector() {
  const allLyrics: ILyricsUi[] = await getLyrics();

  return (
    <main className="lyrics-container">
      {allLyrics?.length && <LyricSelector lyrics={allLyrics} />}
    </main>
  );
}
