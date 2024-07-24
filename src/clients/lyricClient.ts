import { ILyricsDb } from "@/interfaces/db/ILyricsDb";

export async function getLyrics(): Promise<ILyricsDb[]> {
  try {
    const res = await fetch("http://localhost:3000/api/lyrics");
    let results = await res.json();

    if (!results?.length) {
      throw new Error("Not Found");
    }

    return results;
  } catch (err) {
    console.error("LyricClient.getLyrics ERROR - ", err);
    throw err;
  }
}

export async function getLyricById(id: string): Promise<ILyricsDb> {
  try {
    const res = await fetch("http://localhost:3000/api/lyrics/" + id);
    let results = await res.json();

    if (!results?._id) {
      throw new Error("Not Found");
    }

    return results;
  } catch (err) {
    console.error("LyricClient.getLyricById ERROR - ", err);
    throw err;
  }
}

export async function updateLyricById(id: string, updateObject: Partial<ILyricsDb>) {
  try {
    const res = await fetch("http://localhost:3000/api/lyrics/" + id, {
      body: JSON.stringify(updateObject),
      method: "PUT",
    });

    let results = await res.json();

    if (results.error) {
      throw new Error(results.error);
    }
    
  } catch (err) {
    console.error("LyricClient.updateLyricById ERROR - ", err);
    throw err;
  }
}
