import { ILyrics } from "@/interfaces/Lyrics";

export const darkHallowLyrics: ILyrics = {
  title: "Dark Hollow",
  sections: {
    verse1: {
      title: "Verse 1",
      words: `I’d rather be in some dark hollow\nWhere the sun don’t ever shine\nThan to be home alone knowing that you’re gone\nWould cause me to lose my mind`,
    },
    verse2: {
      title: "Verse 2",
      words: `I’d rather be in some dark hollow\nWhere the sun don’t ever shine\nThan to be in some big city\nIn a small room with you love on my mind`,
    },
    chorus: {
      title: "Chorus",
      words: `So blow your whistle freight train\nCarry me further on down the track\nI’m going away I’m leaving today\nI’m going but I ain’t coming back`,
    },
  },
  order: [
    { sectionName: "verse1" },
    { sectionName: "chorus" },
    { sectionName: "verse2" },
    { sectionName: "chorus", isRepeated: true },
  ],
};
