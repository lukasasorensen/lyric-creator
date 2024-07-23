import { getLyricById, getLyrics } from "@/clients/lyricClient";
import LyricEditor from "@/components/views/LyricEditor/LyricEditor";
import { ILyricsUi } from "@/interfaces/ui/ILyricsUi";
import { useRouter } from "next/router";

export default async function LyricEditorView() {
  const router = useRouter();
  const lyricId = router?.query?.id;

  // todo error handling
  if (!lyricId || typeof lyricId !== "string") {
    return <h1>Lyric Not Found</h1>;
  }

  const lyrics: ILyricsUi = await getLyricById(lyricId);

  return (
    <main className="lyrics-container">
      {lyrics?._id && <LyricEditor lyrics={lyrics} />}
    </main>
  );
}
