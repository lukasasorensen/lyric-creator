import { CHORD_EXTENSIONS } from "@/constants/Notes";
import { IChord } from "@/interfaces/db/ISongDb";

export function getChordExtensionsArrayFromChord(chord: IChord) {
  CHORD_EXTENSIONS.forEach(({ shortName, name }) => {
    const includesShortName = chord.extension.includes(shortName);
    const includesLongName = chord.extension.includes(name);
  });
}
