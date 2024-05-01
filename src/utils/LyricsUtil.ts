import { ILyrics, IOrder, ISection } from "@/interfaces/Lyrics";

export function getWordsFromLyrics(lyrics: ILyrics): string {
  if (!lyrics?.order?.length) return "";

  const words: string = lyrics.order
    .map((orderItem: IOrder) => {
      const section: ISection = lyrics.sections[orderItem?.sectionName];

      if (!section?.lines?.length) return;

      section.lines.map((line) => {
        return line.words.join(" ");
      });
    })
    .join("\\n");

  return words;
}
