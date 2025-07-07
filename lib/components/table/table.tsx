import { Button } from "../button";
import type { Column } from "./types";

interface PaginationProps {
  show: boolean;
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  pagination?: PaginationProps;
  testId?: string;
}

const Table = <T extends object>({
  columns,
  data,
  onRowClick,
  pagination,
  testId,
}: TableProps<T>) => {
  return (
    <div className="box-border w-full max-w-full overflow-x-hidden overflow-y-auto">
      <table
        className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden"
        data-testid={`${testId}_table`}
      >
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, colIndex) => (
              <th
                key={String(col.accessor)}
                className={`px-6 py-3 text-left text-sm font-semibold text-gray-700 ${
                  colIndex === 0
                    ? "whitespace-nowrap"
                    : "max-w-[150px] truncate hidden sm:table-cell"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={String(col.accessor)}
                  className={`px-6 py-4 text-sm text-gray-600 ${
                    colIndex === 0
                      ? "whitespace-nowrap"
                      : "max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap hidden sm:table-cell"
                  }`}
                >
                  {String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination?.show && (
        <div
          className="flex gap-4 justify-center mt-8"
          data-testid={`${testId}_table_pagination`}
        >
          {pagination?.limit !== undefined && pagination.onLimitChange && (
            <div className="flex items-center gap-2">
              <select
                id="limit-select"
                className="border rounded px-2 py-1 text-sm"
                value={pagination.limit}
                onChange={(e) =>
                  pagination.onLimitChange?.(Number(e.target.value))
                }
              >
                {[5, 10, 20, 30, 50].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Button
            onClick={pagination.onPreviousPage}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            onClick={pagination.onNextPage}
            disabled={pagination.page === pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export { Table };
