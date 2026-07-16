import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAnimal } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnimalDetailPage({ params }: PageProps) {
  const { id } = await params;

  let animal;
  try {
    animal = await getAnimal(id);
  } catch {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="bg-white py-6 shadow-sm dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/"
            className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
          >
            ← Back to Animal Finder
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={animal.image_url}
              alt={animal.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          <div className="p-6 sm:p-10">
            <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              {animal.category_name}
            </span>

            <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              {animal.name}
            </h1>
            <p className="mt-1 text-lg italic text-zinc-500 dark:text-zinc-400">
              {animal.species}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Habitat
                </h2>
                <p className="mt-1 text-zinc-800 dark:text-zinc-200">{animal.habitat}</p>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Diet
                </h2>
                <p className="mt-1 text-zinc-800 dark:text-zinc-200">{animal.diet}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                About
              </h2>
              <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-300">
                {animal.description}
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
