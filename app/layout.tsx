import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Bubble Pop Farcaster",
  description: "Clique pour faire des bulles ! Connecte ton wallet Farcaster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script src="https://warpcast.com/embed.js" async></script>
      </head>
      <body className="bg-gradient-to-br from-cyan-100 via-purple-100 to-pink-100 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
