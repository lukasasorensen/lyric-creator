import { getLyrics } from "@/clients/lyricClient";
import LyricEditor from "@/components/Lyrics/LyricEditor";
import { darkHallowLyrics, populateLyricSections } from "@/example-data/ExampleLyrics";

export default async function Editor() {
  const allLyrics = await getLyrics();
  const lyrics = populateLyricSections(allLyrics?.[0]);

  return (
    <main className="lyrics-container">{lyrics && <LyricEditor lyrics={lyrics} />}</main>
  );
}
