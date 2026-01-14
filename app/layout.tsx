import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import theme from "@/app/theme"
import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillQuest - Level Up Your Tech Career",
  description: "A skill-progression and reputation system where verified effort earns you real opportunities. No resumes. No fluff. Just proof of ability.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        
      </body>
    </html>
  );
}
