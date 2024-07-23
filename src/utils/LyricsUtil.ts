import { ILyrics, IOrder, ISection } from "@/interfaces/ui/Lyrics";

export function getWordsFromLyrics(lyrics: ILyrics): string {
  if (!lyrics?.order?.length) return "";

  const words: string = lyrics.order
    .map((orderItem: IOrder) => {
      const section: ISection = lyrics.sections[orderItem?.sectionName];

      if (!section?.lines?.length) return;

      return getWordsFromSection(section);
    })
    .join("\n\n");

  return words;
}

export function getWordsFromSection(section: ISection) {
  if (!section?.lines?.length) return "";

  const words: string = section.lines
    .map((line) => {
      return line.words.map((w) => w.text).join(" ");
    })
    .join("\n");
  return words;
}
