export interface IOrderDb {
  sectionName: string;
  showSectionTitleOnly?: boolean;
  repeatCount?: number;
}

export interface ISectionDb {
  [key: string]: {
    title: string;
    lines: ILineDb[];
  };
}

export interface ILineDb {
  words: string;
}

export interface ILyricsDb {
  order: IOrderDb[];
  title: string;
  sections: ISectionDb;
}
