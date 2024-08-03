import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex min-h-screen flex-col items-center ${tw.BG_PRIMARY} w-full p-24`}
    >
      {children}
    </div>
  );
}
