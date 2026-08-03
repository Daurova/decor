// web/app/shared/ui/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-sm text-secondary/60">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRightIcon className="w-4 h-4" />}
          {item.active ? (
            <span className="text-secondary font-medium">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}