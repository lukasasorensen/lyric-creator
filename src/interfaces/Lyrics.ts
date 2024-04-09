interface ISections {
  words: string;
  title: string;
}

interface IOrder {
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
