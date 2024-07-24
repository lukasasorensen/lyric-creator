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

export async function getLyricById(id: string): Promise<ILyricsUi> {
  try {
    const res = await fetch("http://localhost:3000/api/lyrics/" + id);
    let results = await res.json();

    if (!results?._id) {
      throw new Error("Not Found");
    }

    return populateLyricSections(results);
  } catch (err) {
    console.error("LyricClient.getLyricById ERROR - ", err);
    throw err;
  }
}

export async function updateLyricById(id: string, updateObject: Partial<ILyricsDb>) {
  try {
    const res = await fetch("http://localhost:3000/api/lyrics/" + id, {
      body: JSON.stringify(updateObject),
      method: 'PUT'
    });
    
    let results = await res.json();

    if (!results?._id) {
      throw new Error("Not Found");
    }

  } catch (err) {
    console.error("LyricClient.updateLyricById ERROR - ", err);
    throw err;
  }
}
