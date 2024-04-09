interface ISections {
  words: string;
  title: string;
}

export interface ILyrics {
  order: string[];
  sections: {
    [key: string]: ISections;
  };
}
