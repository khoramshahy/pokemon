"use client";

import { be_url, staleTime } from "@/api/backend-url";
import { ErrorMessage, Loading } from "@/lib/components";
import { text } from "@/lib/translator";
import { useQuery } from "@tanstack/react-query";
import type { PokemonModalProps } from "../pokemon-modal";
interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  order: number;
}

type PokemonDetailsProps = Pick<PokemonModalProps, "name">;

const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const res = await fetch(`${be_url}/pokemon/${name}`);
  if (!res.ok) {
    throw new Error("Pokémon not found");
  }
  return res.json();
};

const PokemonDetails = ({ name }: PokemonDetailsProps) => {
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery<PokemonDetails, Error>({
    queryKey: ["pokemon-details", name],
    queryFn: () => fetchPokemonDetails(name),
    staleTime: staleTime,
  });

  return (
    <>
      {isLoading && <Loading message={text.pokemon.loadingDetails} />}
      {isError && <ErrorMessage message={error.message || "Unknown error"} />}
      {pokemon && (
        <div className="pl-4 mb-4">
          <h2 className="text-xl text-center font-bold capitalize mb-2">
            {pokemon.name}
          </h2>
          <p className="mb-1">
            {text.common.height}: {pokemon.height}
          </p>
          <p className="mb-1">
            {text.common.weight}: {pokemon.weight}
          </p>
          <p className="mb-1">
            {text.common.order}: {pokemon.order}
          </p>
        </div>
      )}
    </>
  );
};

export { PokemonDetails };
