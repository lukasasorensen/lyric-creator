import { IDbDocumentDefault } from "./defaultDbProperties";

export interface IWord {
  text: string;
  chord?: IChord;
  hasChord?: boolean;
}

export interface ILine {
  type?: string;
  words?: IWord[];
  measures?: IMeasure[];
}

export interface IChord {
  letter: string;
  quality?: string;
  extensions?: string[];
  customChord?: string;
}

export interface IMeasure {
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
