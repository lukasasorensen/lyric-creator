import { ISongDb } from "@/interfaces/db/ISongDb";
import { InsertOneResult } from "mongodb";

export async function getSongs(): Promise<ISongDb[]> {
  try {
    const res = await fetch("http://localhost:3000/api/songs");
    let results = await res.json();

    if (!results?.length) {
      throw new Error("Not Found");
    }

    return results;
  } catch (err) {
    console.error("SongClient.getSong ERROR - ", err);
    throw err;
  }
}

export async function getSongsForUser(): Promise<ISongDb[]> {
  try {
    const res = await fetch("http://localhost:3000/api/songs/my-songs");
    let results = await res.json();

    if (!results?.length) {
      throw new Error("Not Found");
    }

    return results;
  } catch (err) {
    console.error("SongClient.getSongsForUser ERROR - ", err);
    throw err;
  }
}

export async function getSongById(id: string): Promise<ISongDb> {
  try {
    const res = await fetch("http://localhost:3000/api/songs/" + id);
    let results = await res.json();

    if (!results?._id) {
      throw new Error("Not Found");
    }

    return results;
  } catch (err) {
    console.error("SongClient.getSongById ERROR - ", err);
    throw err;
  }
}

export async function updateSongById(id: string, updateObject: Partial<ISongDb>) {
  try {
    const res = await fetch("http://localhost:3000/api/songs/" + id, {
      body: JSON.stringify(updateObject),
      method: "PUT",
    });

    let results = await res.json();

    if (results.error) {
      throw new Error(results.error);
    }
  } catch (err) {
    console.error("SongClient.updateSongById ERROR - ", err);
    throw err;
  }
}

export async function createSong(song: Partial<ISongDb>): Promise<InsertOneResult> {
  try {
    song.createdAt = new Date();
    song.isDeleted = false;
    const res = await fetch("http://localhost:3000/api/songs/", {
      body: JSON.stringify(song),
      method: "POST",
    });

    let results = await res.json();

    if (results.error) {
      throw new Error(results.error);
    }

    return results;
  } catch (err) {
    console.error("SongClient.createSong ERROR - ", err);
    throw err;
  }
}

export async function deleteSongById(id: string) {
  try {
    const res = await fetch("http://localhost:3000/api/songs/" + id, {
      method: "DELETE",
    });

    let results = await res.json();

    if (results.error) {
      throw new Error(results.error);
    }

    return results;
  } catch (err) {
    console.error("SongClient.deleteSongById ERROR - ", err);
    throw err;
  }
}
