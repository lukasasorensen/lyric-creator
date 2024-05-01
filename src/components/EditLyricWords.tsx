import { ILyrics } from "@/interfaces/Lyrics";
import { useThemeContext } from "@/providers/ThemeProvider";
import { getWordsFromLyrics } from "@/utils/LyricsUtil";
import { useMemo } from "react";

export default function EditLyricWords({ lyrics }: { lyrics: ILyrics }) {
  const words = useMemo(() => {
    return getWordsFromLyrics(lyrics);
  }, [lyrics]);

  return (
    <div className="p-25 container w-full">
      <h2 className={`text-center text-2xl font-bold`}>
        {lyrics.title}
      </h2>
      <textarea>{words}</textarea>
    </div>
  );
}
