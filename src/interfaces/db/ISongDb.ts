import { IDbDocumentDefault } from "./defaultDbProperties";

export interface IWord {
  text: string;
  chord?: IChord;
  hasChord?: boolean;
}

export interface ILine {
  words: IWord[];
}

export interface IChord {
  letter: string;
  quality: string;
  extension: string;
}

export interface ISection {
  lines: ILine[];
  title: string;
}

export interface IOrder {
  sectionName: string;
  showSectionTitleOnly?: boolean;
  repeatCount?: number;
}

export interface ISongDb extends IDbDocumentDefault {
  title: string;
  artist: string;
  order: IOrder[];
  sections: {
    [key: string]: ISection;
  };
}
