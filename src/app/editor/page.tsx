import { getLyrics } from "@/clients/lyricClient";
import LyricEditor from "@/components/views/LyricEditor/LyricEditor";
import { ILyricsUi } from "@/interfaces/ui/ILyricsUi";

export default async function Editor() {
  const allLyrics: ILyricsUi[] = await getLyrics();
  const lyrics = allLyrics?.[0];

  return (
    <main className="lyrics-container">
      {!lyrics && allLyrics?.length && <></>}
      {lyrics && <LyricEditor lyrics={lyrics} />}
    </main>
  );
}
