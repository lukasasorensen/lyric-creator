"use client"
import { ILine } from "@/interfaces/Lyrics";

export default function Line({ line }: { line: ILine }) {
  return (
    <p className="text-black whitespace-pre-line text-center leading-10">
      {line.words.map(word => word.text).join(' ')}
    </p>
  )
}
