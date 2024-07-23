import { ILyricsUi, IOrder } from "@/interfaces/ui/ILyricsUi";
import { populateLyricSections } from "@/utils/LyricsUtil";

interface ISimplifiedSection {
  [key: string]: {
    title: string;
    lines: ILineSimplified[];
  };
}

interface ILineSimplified {
  words: string;
}

interface ILyricsExampleData {
  order: IOrder[];
  title: string;
  sections: ISimplifiedSection;
}

const darkHallow: ILyricsExampleData = {
  title: "Dark Hollow",
  sections: {
    verse1: {
      title: "Verse 1",
      lines: [
        {
          words: "I’d rather be in some dark hollow",
        },
        {
          words: "Where the sun don’t ever shine",
        },
        {
          words: "Than to be home alone knowing that you’re gone",
        },
        {
          words: "Would cause me to lose my mind",
        },
      ],
    },
    verse2: {
      title: "Verse 2",
      lines: [
        {
          words: "In a small room with you love on my mind",
        },
        {
          words: "Than to be in some big city",
        },
        {
          words: "Where the sun don’t ever shine",
        },
        {
          words: "I’d rather be in some dark hollow",
        },
      ],
    },
    chorus: {
      title: "Chorus",
      lines: [
        {
          words: "So blow your whistle freight train",
        },
        {
          words: "Carry me further on down the track",
        },
        {
          words: "I’m going away I’m leaving today",
        },
        {
          words: "I’m going but I ain’t coming back",
        },
      ],
    },
  },
  order: [
    { sectionName: "verse1" },
    { sectionName: "chorus" },
    { sectionName: "verse2" },
    { sectionName: "chorus", showSectionTitleOnly: true, repeatCount: 2 },
  ],
};

export const darkHallowLyrics = populateLyricSections(darkHallow);
