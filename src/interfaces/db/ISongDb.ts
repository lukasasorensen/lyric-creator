import { IDbDocumentDefault } from "./defaultDbProperties";

export interface IWord {
  _id: string;
  text: string;
  chord?: IChord;
  hasChord?: boolean;
}

export interface ILine {
  _id: string;
  type?: string;
  words?: IWord[];
  measures?: IMeasure[];
}

export interface IChord {
  letter: string;
  quality?: string;
  extensions?: string[];
  customChord?: string;
  offset?: number;
}

export interface IMeasure {
  _id: string;
  chords: IChord[];
}

export interface ISection {
  lines: ILine[];
  title: string;
  type: string;
}

export interface IOrder {
  sectionName: string;
  showSectionTitleOnly?: boolean;
  repeatCount?: number;
  isRepeat?: boolean;
  isHighlighted?: boolean;
}

export interface ISongDb extends IDbDocumentDefault {
  title: string;
  artist: string;
  order: IOrder[];
  key?: IChord;

  sections: {
    [key: string]: ISection;
  };
}
