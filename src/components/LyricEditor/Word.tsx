import { IWord } from "@/interfaces/Lyrics";
import styles from "@/styles/Word.module.scss";

export default function Word({ word }: { word: IWord }) {
  return (
    <div className={styles.word}>{word.text} </div>
  )
}
