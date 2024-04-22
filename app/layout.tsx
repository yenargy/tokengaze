import type { Metadata } from "next";
import "../styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Web3Provider } from "@/providers/web3Provider";


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
    <html lang="en">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}