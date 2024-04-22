import type { Metadata } from "next";
import "../styles/globals.css";
import { GeistMono } from 'geist/font/mono';
import '@rainbow-me/rainbowkit/styles.css';
import { Web3Provider } from "@/providers/web3-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Tokengaze",
  description: "Search and discover your tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistMono.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Web3Provider>
            {children}
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}