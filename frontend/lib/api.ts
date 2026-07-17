export const API_URL = "https://api-animal.thefarhany.xyz";

export interface Animal {
  id: number;
  name: string;
  species: string;
  description: string;
  habitat: string;
  diet: string;
  image_url: string;
  category_id: number;
  category_name: string;
}

export interface Category {
  id: number;
  name: string;
}

export async function getAnimals(
  search?: string,
  category?: string,
): Promise<Animal[]> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);

  const res = await fetch(`${API_URL}/api/animals?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch animals");
  const json = await res.json();
  return json.data as Animal[];
}

export async function getAnimal(id: string): Promise<Animal> {
  const res = await fetch(`${API_URL}/api/animals/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch animal");
  const json = await res.json();
  return json.data as Animal;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  const json = await res.json();
  return json.data as Category[];
}
