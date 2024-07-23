import { ILineDb, ILyricsDb } from "@/interfaces/db/ILyricsDb";
import { ILyricsUi, IOrder, ISection } from "@/interfaces/ui/ILyricsUi";

export function getWordsFromLyrics(lyrics: ILyricsUi): string {
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

export function populateLyricSections(song: ILyricsDb): ILyricsUi {
  let lyrics: ILyricsUi = {
    _id: song._id,
    order: song.order,
    title: song.title,
    sections: {},
  };

  for (const sectionKey in song.sections) {
    const section = song.sections[sectionKey];

    lyrics.sections[sectionKey] = {
      lines: section.lines.map((line: ILineDb) => ({
        words: line.words.split(" ").map((word: string) => ({ text: word })),
      })),
      title: section.title,
    };
  }

  return lyrics;
}
