import type { Metadata } from "next";
import { TailWindColorThemeClasses as tw } from "@/constants/ColorTheme";

export const metadata: Metadata = {
  title: "Lyrical - Login",
  description: "Login to Lyrical",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`flex h-full flex-col items-center ${tw.BG_PRIMARY} w-full p-24`}
    >
      {children}
    </main>
  );
}
