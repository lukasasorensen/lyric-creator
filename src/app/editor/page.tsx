import LyricEditor from "@/components/Lyrics/LyricEditor";
import { darkHallowLyrics } from "@/example-data/ExampleLyrics";

export default function Editor() {
  const lyrics = darkHallowLyrics;

  return (
    <main className="lyrics-container">{lyrics && <LyricEditor lyrics={lyrics} />}</main>
  );
}
