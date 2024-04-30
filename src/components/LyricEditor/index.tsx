"use client"
import { ILyrics, IOrder } from "@/interfaces/Lyrics";
import Section from "./Section";


const getSectionFromOrder = (order: IOrder, lyrics: ILyrics, index: number) => {
  const section = lyrics?.sections?.[order?.sectionName];
  if (!section) return null;

  return <Section section={section} showSectionTitleOnly={!!order.showSectionTitleOnly} key={index + order.sectionName} repeatCount={order?.repeatCount} />
}

export default function LyricEditor({ lyrics }: { lyrics: ILyrics }) {
  return (
    <div className="lyric-editor-container w-full p-25">
      <h2 className="text-white text-2xl font-bold text-center">{lyrics.title}</h2>
      {lyrics?.order?.length && lyrics.order.map((order, i) => getSectionFromOrder(order, lyrics, i))}
    </div>
  );
}

