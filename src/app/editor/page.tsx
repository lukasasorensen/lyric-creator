import LyricTextEditor from "@/components/LyricTextEditor";
import LyricEditor from "@/components/Lyrics/LyricEditor";
import { ThemedButton } from "@/components/Themed";
import { darkHallowLyrics } from "@/example-data/ExampleLyrics";
import { ILyrics } from "@/interfaces/Lyrics";
import { useThemeContext } from "@/providers/ThemeProvider";

export default function Editor() {
  const lyrics = darkHallowLyrics;

  return (
    <main className="lyrics-container">{lyrics && <LyricEditor lyrics={lyrics} />}</main>
  );
}
