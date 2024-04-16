"use client"

import { ILine, ILyrics, IOrder, ISection } from "@/interfaces/Lyrics";

const getSectionTitle = (title: string, showSectionTitleOnly: boolean) => {
  return showSectionTitleOnly ? `[${title}]` : title;
}

function Line({ line }: { line: ILine }) {
  return (
    <p className="text-black whitespace-pre-line text-center leading-10">
      {line.words.map(word => word.text).join(' ')}
    </p>
  )
}

function Section({ section, showSectionTitleOnly, repeatCount }: { section: ISection, showSectionTitleOnly: boolean, repeatCount?: number }) {
  return (
    <div className="lyric-section">
      <h3 className="text-black text-lg font-bold text-center mt-5 mb-3">{getSectionTitle(section.title, !!showSectionTitleOnly)} {repeatCount && `[x${repeatCount}]`}</h3>
      {!showSectionTitleOnly && section.lines?.length && section.lines.map((line, i) => <Line line={line} key={i} />)}
    </div>
  )
}

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

