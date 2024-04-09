interface ISections {
  words: string;
  title: string;
}

export interface ILyrics {
  title: string;
  order: string[];
  sections: {
    [key: string]: ISections;
  };
}
