import { IChord } from "@/interfaces/db/ISongDb";
import { isMajor } from "./ChordUtil";

export function getChordSuggestionsForKey(key: IChord) {
  const isMajorChord = isMajor(key?.quality);
  const createChord = (note: string, quality?: string): IChord => ({
    letter: note,
    quality: quality ?? "",
  });

  if (isMajorChord) {
    switch (key.letter.toLowerCase()) {
      case "a":
        return [
          createChord("A"), // I
          createChord("D"), // IV
          createChord("E"), // V
          createChord("F#", "m"), // vi
          createChord("B", "m"), // ii
        ];
      case "b":
        return [
          createChord("B"), // I
          createChord("E"), // IV
          createChord("F#", ""), // V
          createChord("G#", "m"), // vi
          createChord("C#", "m"), // ii
        ];
      case "c":
        return [
          createChord("C"), // I
          createChord("F"), // IV
          createChord("G"), // V
          createChord("A", "m"), // vi
          createChord("D", "m"), // ii
        ];
      case "d":
        return [
          createChord("D"), // I
          createChord("G"), // IV
          createChord("A"), // V
          createChord("B", "m"), // vi
          createChord("E", "m"), // ii
        ];
      case "e":
        return [
          createChord("E"), // I
          createChord("A"), // IV
          createChord("B"), // V
          createChord("C#", "m"), // vi
          createChord("F#", "m"), // ii
        ];
      case "f":
        return [
          createChord("F"), // I
          createChord("Bb"), // IV
          createChord("C"), // V
          createChord("D", "m"), // vi
          createChord("G", "m"), // ii
        ];
      case "g":
        return [
          createChord("G"), // I
          createChord("C"), // IV
          createChord("D"), // V
          createChord("E", "m"), // vi
          createChord("A", "m"), // ii
        ];
      case "ab":
        return [
          createChord("Ab"), // I
          createChord("Db"), // IV
          createChord("Eb"), // V
          createChord("F", "m"), // vi
          createChord("Bb", "m"), // ii
        ];
      case "bb":
        return [
          createChord("Bb"), // I
          createChord("Eb"), // IV
          createChord("F"), // V
          createChord("G", "m"), // vi
          createChord("C", "m"), // ii
        ];
      case "cb":
        return [
          createChord("Cb"), // I
          createChord("Fb"), // IV
          createChord("Gb"), // V
          createChord("Ab", "m"), // vi
          createChord("Db", "m"), // ii
        ];
      case "db":
        return [
          createChord("Db"), // I
          createChord("Gb"), // IV
          createChord("Ab"), // V
          createChord("Bb", "m"), // vi
          createChord("Eb", "m"), // ii
        ];
      case "eb":
        return [
          createChord("Eb"), // I
          createChord("Ab"), // IV
          createChord("Bb"), // V
          createChord("C", "m"), // vi
          createChord("F", "m"), // ii
        ];
      case "fb":
        return [
          createChord("Fb"), // I
          createChord("Bbb"), // IV
          createChord("Cb"), // V
          createChord("Db", "m"), // vi
          createChord("Gb", "m"), // ii
        ];
      case "gb":
        return [
          createChord("Gb"), // I
          createChord("Cb"), // IV
          createChord("Db"), // V
          createChord("Eb", "m"), // vi
          createChord("Ab", "m"), // ii
        ];
    }
  } else {
    // Handle minor keys using i, III, VI, VII, iv
    switch (key.letter.toLowerCase()) {
      case "a":
        return [
          createChord("A", "m"), // i
          createChord("C"), // III
          createChord("F"), // VI
          createChord("G"), // VII
          createChord("D", "m"), // iv
        ];
      case "b":
        return [
          createChord("B", "m"), // i
          createChord("D"), // III
          createChord("G"), // VI
          createChord("A"), // VII
          createChord("E", "m"), // iv
        ];
      case "c":
        return [
          createChord("C", "m"), // i
          createChord("Eb"), // III
          createChord("Ab"), // VI
          createChord("Bb"), // VII
          createChord("F", "m"), // iv
        ];
      case "d":
        return [
          createChord("D", "m"), // i
          createChord("F"), // III
          createChord("Bb"), // VI
          createChord("C"), // VII
          createChord("G", "m"), // iv
        ];
      case "e":
        return [
          createChord("E", "m"), // i
          createChord("G"), // III
          createChord("C"), // VI
          createChord("D"), // VII
          createChord("A", "m"), // iv
        ];
      case "f":
        return [
          createChord("F", "m"), // i
          createChord("Ab"), // III
          createChord("Db"), // VI
          createChord("Eb"), // VII
          createChord("Bb", "m"), // iv
        ];
      case "g":
        return [
          createChord("G", "m"), // i
          createChord("Bb"), // III
          createChord("Eb"), // VI
          createChord("F"), // VII
          createChord("C", "m"), // iv
        ];
      case "ab":
        return [
          createChord("Ab", "m"), // i
          createChord("Cb"), // III
          createChord("Fb"), // VI
          createChord("Gb"), // VII
          createChord("Db", "m"), // iv
        ];
      case "bb":
        return [
          createChord("Bb", "m"), // i
          createChord("Db"), // III
          createChord("Gb"), // VI
          createChord("Ab"), // VII
          createChord("Eb", "m"), // iv
        ];
      case "cb":
        return [
          createChord("Cb", "m"), // i
          createChord("Ebb"), // III
          createChord("Abb"), // VI
          createChord("Bbb"), // VII
          createChord("Fb", "m"), // iv
        ];
      case "db":
        return [
          createChord("Db", "m"), // i
          createChord("Fb"), // III
          createChord("Bbb"), // VI
          createChord("Cb"), // VII
          createChord("Gb", "m"), // iv
        ];
      case "eb":
        return [
          createChord("Eb", "m"), // i
          createChord("Gb"), // III
          createChord("Cb"), // VI
          createChord("Db"), // VII
          createChord("Ab", "m"), // iv
        ];
      case "fb":
        return [
          createChord("Fb", "m"), // i
          createChord("Abb"), // III
          createChord("Dbb"), // VI
          createChord("Ebb"), // VII
          createChord("Bbb", "m"), // iv
        ];
      case "gb":
        return [
          createChord("Gb", "m"), // i
          createChord("Bbb"), // III
          createChord("Ebb"), // VI
          createChord("Fb"), // VII
          createChord("Cb", "m"), // iv
        ];
    }
  }
}
