"use client"
import { ILyrics, IOrder } from "@/interfaces/Lyrics";
import Section from "./Section";


const getSectionFromOrder = (order: IOrder, lyrics: ILyrics) => {
  const section = lyrics?.sections?.[order?.sectionName];
  if (!section) return null;

  return <Section section={section} showSectionTitleOnly={!!order.showSectionTitleOnly} key={order.sectionName} repeatCount={order?.repeatCount} />
}

export default function LyricEditor({ lyrics }: { lyrics: ILyrics }) {
  return (
    <div className="lyric-editor-container w-full max-w-96 p-25">
      <h2 className="text-black text-2xl font-bold text-center">{lyrics.title}</h2>
      {lyrics?.order?.length && lyrics.order.map((order) => getSectionFromOrder(order, lyrics))}
    </div>
  );
}

