import { be_url } from "@/api/backend-url";
import { PokemonList } from "@/components";
import type { Pokemon } from "@/lib/types";

interface PokemonListResponse {
  count: number;
  results: Pokemon[];
}

export default async function PokemonPage({
  searchParams,
}: {
  searchParams?: { page?: string; search?: string };
}) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1");
  const search = params?.search?.toLowerCase().trim() || "";
  const limit = 20;
  const offset = (page - 1) * limit;

  let pokemonList: Pokemon[] = [];
  let total = 0;
  let totalPages = 1;
  let errorMessage = "";

  if (search) {
    try {
      const res = await fetch(`${be_url}/pokemon/${search}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 404) {
          errorMessage = `Pokémon "${search}" not found.`;
        } else {
          errorMessage = "An unexpected error occurred while searching.";
        }
      } else {
        const data = await res.json();
        pokemonList = [{ name: data.name }];
        total = 1;
      }
    } catch {
      errorMessage = "Failed to fetch Pokémon. Please try again.";
    }
  } else {
    // Paginated list
    try {
      const res = await fetch(
        `${be_url}/pokemon?limit=${limit}&offset=${offset}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data: PokemonListResponse = await res.json();
      pokemonList = data.results;
      total = data.count;
      totalPages = Math.ceil(total / limit);
    } catch {
      errorMessage = "Failed to load Pokémon list. Please try again.";
    }
  }

  return (
    <PokemonList
      errorMessage={errorMessage}
      totalPages={totalPages}
      page={page}
      pokemonList={pokemonList}
      search={search}
    />
  );
}
