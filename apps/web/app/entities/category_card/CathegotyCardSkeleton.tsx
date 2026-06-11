'use client';

export function CategoryCardSkeleton() {
  return (
    <div className="w-full min-w-35 overflow-hidden rounded-xl bg-background-secondary shadow-md">
      {/* Блок-заглушка изображения */}
      <div className="aspect-square w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
      
      {/* Блок-заглушка текста */}
      <div className="p-4 text-center">
        <div className="mx-auto h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 mx-auto h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

//TODO: выровнять скелетон по карточкам