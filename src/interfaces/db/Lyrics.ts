export interface IOrderDb {
  sectionName: string;
  showSectionTitleOnly?: boolean;
  repeatCount?: number;
}

interface ISectionDb {
  [key: string]: {
    title: string;
    lines: ILineDb[];
  };
}

interface ILineDb {
  words: string;
}

export interface ILyricsDb {
  order: IOrderDb[];
  title: string;
  sections: ISectionDb;
}
