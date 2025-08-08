import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedIn Clone",
  description: "A LinkedIn-like social network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Providers>
          <header className="sticky top-0 z-40 bg-white shadow">
            <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3">
              <Link href="/" className="text-xl font-semibold text-blue-700">in</Link>
              <input className="flex-1 bg-gray-100 rounded px-3 py-2" placeholder="Search" />
              <nav className="flex items-center gap-4 text-sm">
                <Link href="/" className="hover:text-blue-700">Home</Link>
                <Link href="/network" className="hover:text-blue-700">My Network</Link>
                <Link href="/jobs" className="hover:text-blue-700">Jobs</Link>
                <Link href="/messaging" className="hover:text-blue-700">Messaging</Link>
                <Link href="/notifications" className="hover:text-blue-700">Notifications</Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
