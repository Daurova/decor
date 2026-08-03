// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl text-center">
      <h1 className="text-3xl font-bold text-secondary mb-4">
        Страница не найдена
      </h1>
      <p className="text-secondary/60 mb-8">
        К сожалению, запрошенная страница не существует.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
      >
        На главную
      </Link>
    </div>
  );
}