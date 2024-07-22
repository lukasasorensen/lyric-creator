import { ILyrics } from "@/interfaces/Lyrics";

export async function getLyrics(): Promise<ILyrics[]> {
  const res = await fetch("http://localhost:3000/api/lyrics");
  return res.json();
}
