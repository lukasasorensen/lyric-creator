import { updateSongById } from "@/clients/songClient";
import { ThemedTextInput } from "@/components/Themed";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { useSongContext } from "@/providers/SongProvider";
import React, { KeyboardEvent, useState } from "react";

export default function EditSongTitle() {
  const { song, setSong } = useSongContext();
  const [isEditingSongTitle, setIsEditingSongTitle] = useState(false);
  const [editSongTitleText, setEditSongTitleText] = useState(song?.title);
  const [isSaving, setIsSaving] = useState(false);

  const showEditSongTitleInput = () => {
    setIsEditingSongTitle(true);
  };

  const saveEditTitleText = async () => {
    if (!song) return;
    try {
      setIsSaving(true);
      setIsEditingSongTitle(false);
      song.title = editSongTitleText ?? "";
      setSong(song);
      await updateSongById(song._id, song);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === "enter") {
      saveEditTitleText();
    }
  };

  if (isSaving) {
    return (
      <div className="h-24">
        <LoadingDisplay />
      </div>
    );
  }

  return (
    <div>
      {!isEditingSongTitle && (
        <h2
          className="mb-5 text-center text-2xl font-bold"
          onClick={showEditSongTitleInput}
        >
          {song?.title}
        </h2>
      )}
      {isEditingSongTitle && (
        <div className="container flex justify-center">
          <ThemedTextInput
            className="max-w-64 text-center text-2xl"
            defaultValue={song?.title}
            onChange={(e) => setEditSongTitleText(e.target.value)}
            onKeyDown={(e) => onKeyDown(e)}
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
