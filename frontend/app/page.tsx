"use client";

import { useEffect, useState } from "react";
import { Animal, Category, getAnimals, getCategories } from "@/lib/api";
import AnimalCard from "./components/AnimalCard";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setError("Failed to load categories");
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError("");
      try {
        const data = await getAnimals(search, category);
        setAnimals(data);
      } catch {
        setError("Failed to load animals. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }
    loadAnimals();
  }, [search, category]);

  function handleSearch(newSearch: string, newCategory: string) {
    setSearch(newSearch);
    setCategory(newCategory);
  }

  useEffect(() => {
    async function loadAnimals() {
      console.log("Start");

      setLoading(true);

      try {
        const data = await getAnimals(search, category);

        console.log("Success", data.length);

        setAnimals(data);
      } catch (e) {
        console.error(e);

        setError("Failed to load animals.");
      } finally {
        console.log("Finally");

        setLoading(false);
      }
    }

    loadAnimals();
  }, [search, category]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="bg-white py-8 shadow-sm dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            🐾 Animal Finder
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            Discover amazing animals from around the world.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <SearchBar
          search={search}
          category={category}
          categories={categories}
          onSearch={handleSearch}
        />

        {loading && (
          <div className="mt-8 text-center text-zinc-500 dark:text-zinc-400">
            Loading animals...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && animals.length === 0 && (
          <div className="mt-8 text-center text-zinc-500 dark:text-zinc-400">
            No animals found. Try a different search.
          </div>
        )}

        {!loading && animals.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
        © {new Date().getFullYear()} Animal Finder. Built with Next.js + Node.js
        + MySQL.
      </footer>
    </div>
  );
}
