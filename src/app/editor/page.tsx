import { getLyrics } from "@/clients/lyricClient";
import LyricEditor from "@/components/Lyrics/LyricEditor";
import { ILyrics } from "@/interfaces/ui/Lyrics";

export default async function Editor() {
  const allLyrics: ILyrics = await getLyrics();
  const lyrics = allLyrics?.[0];

  return (
    <main className="lyrics-container">{lyrics && <LyricEditor lyrics={lyrics} />}</main>
  );
}
