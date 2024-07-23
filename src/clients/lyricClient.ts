import { ILyricsDb } from "@/interfaces/db/Lyrics";

export async function getLyrics(): Promise<ILyricsDb[]> {
  const res = await fetch("http://localhost:3000/api/lyrics");
  return res.json();
}
