export type Column<T> = {
  header: string;
  accessor: keyof T;
};
