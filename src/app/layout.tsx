import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/index.scss";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/ui/NavBar";
import { Body } from "@/components/views/Body";
import { SkeletonTheme } from "react-loading-skeleton";
import { AuthProvider } from "@/providers/AuthProvider";
import { SongProvider } from "@/providers/SongProvider";

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
      <AuthProvider>
        <ThemeProvider>
          <SongProvider>
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
          </SongProvider>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}
