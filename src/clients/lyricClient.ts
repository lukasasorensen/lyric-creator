import { ILyrics } from "@/interfaces/Lyrics";

export async function getLyrics(): Promise<ILyrics[]> {
  const res = await fetch("api/lyrics");
  return res.json();
}
