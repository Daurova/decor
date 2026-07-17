import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import {PackageLayout}  from '@repo/ui/PackageLayout';
//@ts-ignore
import '@repo/styles'; // ← стили уже загружены

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gloriter презентация",
  description: "Gloriter презентация",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className='text-amber-950'>tailwind </div>
        <PackageLayout>{children}</PackageLayout>
      </body>
    </html>
  );
}