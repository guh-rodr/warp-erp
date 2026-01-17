import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta {
    isFetching?: boolean;
    sortable?: string[];
  }
}
