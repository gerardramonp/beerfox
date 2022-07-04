import { useQuery } from "react-query";
import { format } from "date-fns";
import { TBeersFilters } from "../hooks/useBeersFilters";
import { QUERY_BEERS } from "./queryKeys";
import getBeers from "../api/getBeers";

export default function useGetBeersQuery(filters: TBeersFilters) {
  return useQuery([QUERY_BEERS], async () => {
    if (filters.value) {
      const params =
        filters.type === "name"
          ? {
              beer_name: filters.value,
            }
          : {
              brewed_before: format(filters.value as Date, "MM-yyyy"),
            };

      return getBeers(params);
    }

    return null;
  });
}
