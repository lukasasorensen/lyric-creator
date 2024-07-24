import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-around ${tw.BG_PRIMARY} p-24 w-full`}
    >
      <h1 className={`mb-10 text-center text-4xl font-bold ${tw.TEXT_SECONDARY}`}>
        Lyric Creator
      </h1>
      {children}
    </div>
  );
}
