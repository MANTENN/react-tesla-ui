import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load Universal fonts with Next.js optimization
const universalDisplay = localFont({
  src: [
    {
      path: "../public/fonts/Universal-Sans-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Universal-Sans-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-universal-display",
  display: "swap",
});

const universalText = localFont({
  src: [
    {
      path: "../public/fonts/Universal-Sans-Text-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Universal-Sans-Text-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-universal-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tesla UI",
  description: "React Tesla UI Interface",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${universalDisplay.variable} ${universalText.variable}`}
    >
      <body className={universalText.className}>{children}</body>
    </html>
  );
}
