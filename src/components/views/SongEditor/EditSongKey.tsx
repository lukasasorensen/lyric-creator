import { updateSongById } from "@/clients/songClient";
import { ThemedTextInput } from "@/components/Themed";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { useSongContext } from "@/providers/SongProvider";
import React, { KeyboardEvent, useState } from "react";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function EditSongKey() {
  const { song, setSong } = useSongContext();
  const [isEditingSongKey, setIsEditingSongKey] = useState(false);
  const [editSongKey, setEditSongKey] = useState(song?.key);
  const [isSaving, setIsSaving] = useState(false);

  const showEditSongTitleInput = () => {
    setIsEditingSongKey(true);
  };

  const saveEditSongKey = async () => {
    if (!song) return;
    try {
      setIsSaving(true);
      setIsEditingSongKey(false);
      // todo make this work
      song.key = editSongKey ?? "";
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
      saveEditSongKey();
    }
  };

  if (isSaving) {
    return (
      <div className="h-24">
        <LoadingDisplay />
      </div>
    );
  }

  // todo add popover with chord selector
  return (
    <div>
      {!isEditingSongKey && (
        <h1
          className={`mb-5 text-center text-3xl font-bold ${tw.TEXT_SECONDARY}`}
          onClick={showEditSongTitleInput}
        >
          {song?.key}
        </h1>
      )}
    </div>
  );
}
