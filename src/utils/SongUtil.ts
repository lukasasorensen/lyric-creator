import { ISongDb, IOrder, ISection, ILine } from "@/interfaces/db/ISongDb";
import { e } from "keyboard-key";
import { v4 as uuid } from "uuid";
import { createKebabFromText } from "./StringUtil";

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
      return line.words?.map((w) => w.text).join(" ");
    })
    .join("\n");
  return words;
}

export function getLinesFromText(text: string): ILine[] {
  return text.split("\n").map((line) => ({
    _id: uuid(),
    words: line.split(" ").map((word) => ({ _id: uuid(), text: word })),
  }));
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
  const newLines = getLinesFromText(text);

  const updatedLines = newLines.map((line, lineIndex) => {
    const currentLine = section?.lines?.[lineIndex];

    return {
      ...currentLine,
      ...line,
      words: line.words?.map((word, wordIndex) => {
        const currentWord = currentLine?.words?.[wordIndex];
        return {
          ...currentWord,
          ...word,
        };
      }),
    };
  });

  section.lines = updatedLines;
  return section;
}

export function getUniqueSectionKeyAndTitleForSong(song: ISongDb, sectionTitle: string) {
  let counter = 1;
  let uniqueTitle = sectionTitle;
  let uniqueKey = createKebabFromText(sectionTitle);

  let sectionKeyExists = !!song?.sections[uniqueKey];
  if (sectionKeyExists) {
    while (sectionKeyExists) {
      uniqueKey = `${uniqueKey}-${counter}`;
      uniqueTitle = `${sectionTitle} (${counter})`;
      sectionKeyExists = !!song?.sections[uniqueKey];
      counter++;
    }
  }

  return {
    uniqueTitle,
    uniqueKey,
  };
}
