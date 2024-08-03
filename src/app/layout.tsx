import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/index.scss";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/ui/NavBar";
import { Body } from "@/components/views/Body";
import SongProvider from "@/providers/SongProvider";
import { SkeletonTheme } from "react-loading-skeleton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lyrical",
  description: "Create Your Lyrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <SkeletonTheme
          baseColor="#334155"
          highlightColor="#64748B"
          borderRadius="0.5rem"
          duration={4}
        >
          <body className={inter.className}>
            <Body>
              <NavBar />
              {children}
            </Body>
          </body>
        </SkeletonTheme>
      </ThemeProvider>
    </html>
  );
}
