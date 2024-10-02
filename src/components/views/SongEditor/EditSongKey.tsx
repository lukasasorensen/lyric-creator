import { updateSongById } from "@/clients/songClient";
import { ThemedTextInput } from "@/components/Themed";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { useSongContext } from "@/providers/SongProvider";
import React, { KeyboardEvent, useState } from "react";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import ChordSelector from "../ChordSelctor/ChordSelector";
import { IChord } from "@/interfaces/db/ISongDb";

export default function EditSongKey() {
  const { song, setSong } = useSongContext();
  const [isSaving, setIsSaving] = useState(false);

  const updateSongKey = async (newSongKey: IChord) => {
    if (!song) return;
    try {
      setIsSaving(true);
      song.key = newSongKey;
      setSong(song);
      await updateSongById(song._id, song);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsSaving(false);
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
    <Popover>
      {({ close }) => (
        <>
          <PopoverButton>
            <p className={`mb-5 text-center text-lg font-bold ${tw.TEXT_TERTIARY}`}>
              {song?.key?.letter
                ? `Key of ${song.key.letter}${song.key.quality}`
                : "Add Song Key"}
            </p>
          </PopoverButton>
          <PopoverPanel
            anchor="top"
            className={`flex justify-center p-4 ${tw.BG_SECONDARY} rounded-md border-2 border-slate-300 dark:border-slate-600`}
            focus={true}
          >
            <div className="flex flex-col text-center">
              <ChordSelector
                onSelect={(chord) => {
                  updateSongKey(chord);
                  close();
                }}
                initialChord={song?.key}
                enableExtensions={false}
              />
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
