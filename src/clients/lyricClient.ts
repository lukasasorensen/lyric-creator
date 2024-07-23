import { ILyricsDb } from "@/interfaces/db/ILyricsDb";
import { ILyricsUi } from "@/interfaces/ui/ILyricsUi";
import { populateLyricSections } from "@/utils/LyricsUtil";

export async function getLyrics(): Promise<ILyricsUi[]> {
  try {
    const res = await fetch("http://localhost:3000/api/lyrics");
    let results = await res.json();

    if (!results?.length) {
      throw new Error("Not Found");
    }

    return results.map((result: ILyricsDb): ILyricsUi => populateLyricSections(result));
  } catch (err) {
    console.error("LyricClient.getLyrics ERROR - ", err);
    throw err;
  }
}
