import { ILyricsDb } from "@/interfaces/db/Lyrics";
import { ILyrics } from "@/interfaces/ui/Lyrics";
import { populateLyricSections } from "@/utils/LyricsUtil";

export async function getLyrics(): Promise<ILyrics[]> {
  try {
    const res = await fetch("http://localhost:3000/api/lyrics");
    let results = await res.json();

    if (!results?.length) {
      throw new Error("Not Found");
    }

    return results.map((result: ILyricsDb): ILyrics => populateLyricSections(result));
  } catch (err) {
    console.error("LyricClient.getLyrics ERROR - ", err);
    throw err;
  }
}
