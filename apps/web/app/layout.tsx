import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css'; // Tailwind уже должен импортироваться
import { ThemeProvider } from './providers/theme-provider';
import { ThemeToggle } from './shared/ui/theme-toggle';
import { Logo } from './shared/ui/Logo';
import Link from 'next/link';

// 1. Импорт Inter (для основного текста)
const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
  display: 'swap',
});

// 2. Импорт Manrope (для заголовков)
const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Каталог товаров | GLORITER',
  description: 'Онлайн-каталог декоративных панелей',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru"className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
    <body className="bg-background min-h-screen flex flex-col">

   <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <header className="bg-background shadow-sm border-b-3 border-primary-border">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-foreground">
              <Logo></Logo>
            </div>
            <nav className="space-x-4">
              <Link href="/about" className="text-foreground hover:text-gray-900 font-heading">О нас</Link>
              <Link href="/catalogue" className="text-foreground hover:text-gray-900 font-heading">Каталог</Link>
              <Link href="/disigners" className="text-foreground hover:text-gray-900 font-heading">Дизайнерам</Link>

            </nav>
            <ThemeToggle></ThemeToggle>
          </div>
        </header>
        <main className="grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-background border-t-3 border-primary-border py-4 text-center text-foreground text-sm">
          © 2026 GLORITER — все права защищены
        </footer>
        </ThemeProvider>
        </body>
    </html>
  );
}