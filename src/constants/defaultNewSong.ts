import { ISongDb } from "@/interfaces/db/ISongDb";

const defaultNewSong: Partial<ISongDb> = {
  title: "Song Title",
  artist: "Song Artist",
  sections: {},
  order: [],
};

export default defaultNewSong;
