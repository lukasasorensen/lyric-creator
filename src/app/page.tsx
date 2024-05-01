"use client";
import { ThemedButton } from "@/components/Themed";
import { useThemeContext } from "@/providers/ThemeProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { twColorClasses } = useThemeContext();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-around ${twColorClasses.BG_PRIMARY} p-24`}
    >
      <h1
        className={`mb-10 text-center text-4xl font-bold ${twColorClasses.TEXT_SECONDARY}`}
      >
        Lyrical
      </h1>
      <ThemedButton
        text="Lyric Editor"
        color="primary"
        onClick={() => router.push("/editor")}
      />
    </main>
  );
}
