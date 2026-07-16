"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Category } from "@/lib/api";

interface SearchBarProps {
  search: string;
  category: string;
  categories: Category[];
  onSearch: (search: string, category: string) => void;
}

export default function SearchBar({
  search,
  category,
  categories,
  onSearch,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;
    onSearch(searchValue, category);
  }

  function handleSelect(value: string) {
    const form = document.getElementById("search-form") as HTMLFormElement | null;
    const searchValue =
      (form?.elements.namedItem("search") as HTMLInputElement | null)?.value ??
      search;
    onSearch(searchValue, value);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedLabel =
    categories.find((cat) => String(cat.id) === category)?.name ??
    "All categories";

  return (
    <form
      id="search-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row"
    >
      <input
        type="text"
        name="search"
        defaultValue={search}
        placeholder="Search animal name, species, or description..."
        className="flex-1 rounded-xl border border-zinc-300 bg-transparent px-4 py-2.5 text-sm text-black outline-none placeholder:text-zinc-400 focus:border-sky-500 dark:border-zinc-700 dark:text-white"
      />

      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-black outline-none transition hover:border-sky-500 focus:border-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white sm:w-44"
        >
          {selectedLabel}
          <span className="ml-2 text-xs">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <li>
              <button
                type="button"
                onClick={() => handleSelect("")}
                className={`w-full px-4 py-2 text-left text-sm ${
                  category === ""
                    ? "bg-sky-600 text-white"
                    : "text-black hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
                }`}
              >
                All categories
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(String(cat.id))}
                  className={`w-full px-4 py-2 text-left text-sm ${
                    String(cat.id) === category
                      ? "bg-sky-600 text-white"
                      : "text-black hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
      >
        Search
      </button>
    </form>
  );
}
