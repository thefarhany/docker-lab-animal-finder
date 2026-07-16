"use client";

import Image from "next/image";
import Link from "next/link";
import { Animal } from "@/lib/api";

interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <Link
      href={`/animal/${animal.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={animal.image_url}
          alt={animal.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-sky-600 dark:text-sky-400">
          {animal.category_name}
        </span>
        <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {animal.name}
        </h3>
        <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
          {animal.species}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
          {animal.description}
        </p>
      </div>
    </Link>
  );
}
