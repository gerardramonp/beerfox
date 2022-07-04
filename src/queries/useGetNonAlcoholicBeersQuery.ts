import { useQuery } from "react-query";
import getBeers from "../api/getBeers";
import { IBeerResponse } from "../types/beerResponse";
import { QUERY_NON_ALCOHOLIC_BEERS } from "./queryKeys";

export default function useGetNonAlcoholicBeersQuery(abvValue: number = 1) {
  return useQuery(
    [QUERY_NON_ALCOHOLIC_BEERS, abvValue],
    async () => {
      const params = {
        abv_lt: abvValue,
      };

      const beers: IBeerResponse[] = await getBeers(params);

      const filteredBeers = beers.filter((beer) => {
        if (!beer.name || !beer.description || !beer.image_url) {
          return false;
        }
        return true;
      });

      return filteredBeers;
    },
    {
      retry: 1,
    },
  );
}
