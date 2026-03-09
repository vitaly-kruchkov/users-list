export interface PaginationProps {
  total: number;
  limit: number;
  skip: number;
  onChange: (skip: number) => void;
}
