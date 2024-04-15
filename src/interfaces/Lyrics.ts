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

export interface ISections {
  lines: ILine[];
  title: string;
}

export interface IOrder {
  sectionName: string;
  isRepeated?: boolean;
}
export interface ILyrics {
  title: string;
  order: IOrder[];
  sections: {
    [key: string]: ISections;
  };
}
