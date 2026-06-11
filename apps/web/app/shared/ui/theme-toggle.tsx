// shared/ui/theme-toggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Импортируем иконки
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect нужен, чтобы избежать ошибки гидратации, т.к. тема определяется только на клиенте
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />; // Placeholder, пока тема неизвестна

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full  text-foreground hover:cursor-pointer"
      aria-label="Переключить тему"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" /> // Иконка солнца для тёмной темы
      ) : (
        <MoonIcon className="h-5 w-5" /> // Иконка луны для светлой темы
      )}
    </button>
  );
}