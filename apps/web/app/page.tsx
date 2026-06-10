import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-centerfont-sans bg-background-secondary">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-background-secondary sm:items-start">
        <div>
          <h1 className = 'text-foreground'>ГЛАВНАЯ СТРАНИЦА</h1>
        </div>
      </main>
    </div>
  );
}
