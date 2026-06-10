import type { Metadata } from 'next';
import './globals.css'; // Tailwind уже должен импортироваться
import { ThemeProvider } from './providers/theme-provider';
import { ThemeToggle } from './shared/ui/theme-toggle';
import { Logo } from './shared/ui/Logo';
import Link from 'next/link';
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
    <html lang="ru" suppressHydrationWarning>
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
              <Link href="/about" className="text-foreground hover:text-gray-900">О нас</Link>
              <Link href="/catalogue" className="text-foreground hover:text-gray-900">Каталог</Link>
              <Link href="/disigners" className="text-foreground hover:text-gray-900">Дизайнерам</Link>

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