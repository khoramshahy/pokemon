"use client";

import { Button, ErrorMessage, Table, type Column } from "@/lib/components";
import { text } from "@/lib/translator";
import type { Pokemon } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PokemonModal } from "./pokemon-modal";

interface pokemonListProps {
  totalPages: number;
  page: number;
  errorMessage: string;
  search: string;
  pokemonList: Pokemon[];
}

const PokemonList = (props: pokemonListProps) => {
  const { search, errorMessage, pokemonList, totalPages, page } = props;
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [searchFilter, setFilterName] = useState(search);
  const router = useRouter();

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Url", accessor: "url" },
  ] as const satisfies Column<Pokemon>[];

  const onNextPage = () => {
    router.push(`/pokemon?page=${page + 1}`);
  };

  const onPreviousPage = () => {
    router.push(`/pokemon?page=${page - 1}`);
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchFilter === "") router.push(`/pokemon?page=1`);
    else router.push(`/pokemon?search=${searchFilter}`);
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold capitalize mb-4">
          {text.pokemon.pokemonList}
        </h1>

        <form
          onSubmit={(e) => handleFilter(e)}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 sm:gap-4 mb-4"
        >
          <input
            type="text"
            name="filter_name"
            placeholder={text.common.filterByName}
            value={searchFilter}
            onChange={(e) => setFilterName(e.target.value)}
            autoComplete="off"
            className="w-full sm:w-80 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm mr-4"
          />

          <div className="flex justify-end sm:justify-start">
            <Button type="submit">{text.common.filter}</Button>
          </div>
        </form>

        {errorMessage ? (
          <ErrorMessage message={errorMessage} />
        ) : (
          <>
            {pokemonList && (
              <Table
                data={pokemonList}
                columns={columns}
                onRowClick={(row) => setSelectedPokemon(row.name)}
                pagination={{
                  show: !search && totalPages > 1,
                  page,
                  totalPages,
                  onNextPage,
                  onPreviousPage,
                }}
                testId="pokemon-list"
              />
            )}
          </>
        )}
      </div>
      {selectedPokemon && (
        <PokemonModal
          name={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </>
  );
};

export default PokemonList;
