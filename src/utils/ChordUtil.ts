import { CHORD_EXTENSIONS } from "@/constants/Notes";
import { IChord } from "@/interfaces/db/ISongDb";

export function getChordExtensionsArrayFromChord(chord: IChord) {
  CHORD_EXTENSIONS.forEach(({ shortName, name }) => {
    const includesShortName = chord.extensions.includes(shortName);
    const includesLongName = chord.extensions.includes(name);
  });
}

export function isMajor(quality: string | undefined) {
  if (!quality) return true;
  return ["", "maj", "major"].includes(quality.toLowerCase());
}
