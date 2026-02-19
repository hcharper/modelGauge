import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Meter - Gas Tank Cost Visualizer",
  description:
    "See how fast $100 drains across 15+ AI models. Visual gas tank comparison for OpenClaw.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
