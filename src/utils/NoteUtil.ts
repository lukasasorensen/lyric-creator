export function convertSharpToFlat(sharpNote: string) {
  if (!sharpNote.includes("#")) return sharpNote;

  switch (sharpNote.toLowerCase()) {
    case "a#":
      return "Bb";
    case "c#":
      return "Db";
    case "d#":
      return "Eb";
    case "f#":
      return "Gb";
    case "g#":
      return "Ab";
    default:
      return sharpNote; // If no match, return the original note
  }
}

export function convertFlatToSharp(flatNote: string) {
  if (!flatNote.includes("b")) return flatNote;

  switch (flatNote.toLowerCase()) {
    case "bb":
      return "A#";
    case "db":
      return "C#";
    case "eb":
      return "D#";
    case "gb":
      return "F#";
    case "ab":
      return "G#";
    default:
      return flatNote; // If no match, return the original note
  }
}
