import { ISongDb, IOrder, ISection, ILine } from "@/interfaces/db/ISongDb";

export function getWordsFromSong(song: ISongDb): string {
  if (!song?.order?.length) return "";

  const words: string = song.order
    .map((orderItem: IOrder) => {
      const section: ISection = song.sections[orderItem?.sectionName];

      if (!section?.lines?.length) return;

      return getWordsFromSection(section);
    })
    .join("\n\n");

  return words;
}

export function getWordsFromSection(section: ISection | null | undefined) {
  if (!section?.lines?.length) return "";

  const words: string = section.lines
    .map((line) => {
      return line.words.map((w) => w.text).join(" ");
    })
    .join("\n");
  return words;
}

/**
 * This method takes a text string from an input and converts the string to lyric section model
 * for db and attempts to apply word metadata to the words array created by splitting the text by array index
 *
 * @export
 * @param {string} text
 * @param {ISection} section - section to aplly
 * @return {*}  {ILine[]}
 */
export function updateSongSectionFromText(text: string, section: ISection): ISection {
  const newLines = text
    .split("\n")
    .map((line) => ({ words: line.split(" ").map((word) => ({ text: word })) }));

  const updatedLines = newLines.map((line, lineIndex) => {
    return {
      words: line.words.map((word, wordIndex) => ({
        ...section.lines?.[lineIndex]?.words?.[wordIndex],
        text: word.text,
      })),
    };
  });

  section.lines = updatedLines;
  return section;
}
