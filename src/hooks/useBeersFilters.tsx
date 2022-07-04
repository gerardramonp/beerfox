import { useState } from "react";

export type TFiltersType = "name" | "date";

export type TBeersFilters = {
  type: TFiltersType;
  value: string | Date | null;
};

export default function useBeersFilters() {
  const [filters, setFilters] = useState<TBeersFilters>({
    type: "name",
    value: null,
  });

  return { filters, setFilters };
}
