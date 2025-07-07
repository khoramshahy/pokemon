"use client";

import { be_url, staleTime } from "@/api/backend-url";
import { ErrorMessage, Loading, Table, type Column } from "@/lib/components";
import { usePaginationStore } from "@/stores/paginationStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Results = {
  name: string;
  url: string;
};

interface EvolutionTriggerList {
  count: number;
  results: Results[];
}

const fetchEvolutionTriggers = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const url = `${be_url}/evolution-trigger?limit=${limit}&offset=${offset}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch evolution triggers (status ${res.status}): ${
          errorText || res.statusText
        }`
      );
    }

    const data = await res.json();
    return data;
  } catch {
    throw new Error(
      "Unable to load evolution triggers. Please try again later."
    );
  }
};

const EvolutionTriggers = () => {
  const [page, setPage] = useState(1);
  const limit = usePaginationStore((state) => state.limit);
  const setLimit = usePaginationStore((state) => state.setLimit);

  const { data, isLoading, isError, error } = useQuery<EvolutionTriggerList>({
    queryKey: ["evolutionTriggers", page, limit],
    queryFn: () => fetchEvolutionTriggers(page, limit),
    staleTime: staleTime,
  });
  const totalPages = data ? Math.ceil(data.count / limit) : 1;

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Url", accessor: "url" },
  ] as const satisfies Column<Results>[];

  const onNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const onPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const onLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <>
      {isLoading && <Loading />}
      {isError && <ErrorMessage message={(error as Error).message} />}
      {data && (
        <Table
          data={data.results}
          columns={columns}
          pagination={{
            show: true,
            page,
            totalPages: totalPages,
            onNextPage,
            onPreviousPage,
            limit,
            onLimitChange,
          }}
          testId="evolution-trigger"
        />
      )}
    </>
  );
};

export { EvolutionTriggers };
