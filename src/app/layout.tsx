import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Model Gauge - AI Cost Visualizer",
  description:
    "See how fast $100 drains across 27 AI models from 10 providers. Visual gas tank comparison of live API pricing, built for OpenClaw.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
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
