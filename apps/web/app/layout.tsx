// @ts-ignore
import '@repo/styles';

import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { ThemeProvider } from './providers/theme-provider';
import { ThemeToggle } from './shared/ui/theme-toggle';
import { Logo } from './shared/ui/Logo';
import Link from 'next/link';

//TODO: сейчас layout.tsx использует global.css из web а не из packages
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
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="bg-background min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Хедер с эффектами */}
          <header className="relative bg-background/80 backdrop-blur-md border-b border-border/20 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Декоративная линия сверху */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-foreground p-0 transition-transform duration-300 hover:scale-[1.02]">
                  <Logo />
                </div>
                {/* Бренд-подпись */}
                <span className="hidden sm:inline-block text-[10px] text-secondary/40 font-light tracking-[0.2em] uppercase border-l border-border/30 pl-3">
                  Одно решение для застройщика
                </span>
              </div>

              <nav className="flex gap-2 sm:gap-6 whitespace-nowrap">
                <Link
                  href="/about"
                  className="relative text-secondary/70 hover:text-primary font-heading text-sm sm:text-base transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  О нас
                </Link>
                <Link
                  href="/catalogue"
                  className="relative text-secondary/70 hover:text-primary font-heading text-sm sm:text-base transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  Каталог
                </Link>
                <Link
                  href="/designers"
                  className="relative text-secondary/70 hover:text-primary font-heading text-sm sm:text-base transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  Дизайнерам
                </Link>
              </nav>

              <div className="flex items-center gap-3">
                {/* Индикатор онлайн */}
                {/* <span className="hidden md:flex items-center gap-1.5 text-[10px] text-red-500/70 font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  позвонить
                </span> */}
                <ThemeToggle />
              </div>
            </div>

            {/* Декоративная линия снизу с градиентом */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </header>

          <main className="grow container mx-auto px-4 py-3">
            {children}
          </main>

          <footer className="relative bg-background/80 backdrop-blur-sm border-t border-border/20 py-4 text-center text-secondary/40 text-sm">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <p className="tracking-wide">
              © 2026 GLORITER — все права защищены
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}