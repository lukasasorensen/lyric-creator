export interface IWord {
  text: string;
  chord?: IChord;
  hasChord?: boolean;
}

export interface IChord {
  letter: string;
  quality: string;
  extension: string;
}

export interface ISections {
  words: IWord[];
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
