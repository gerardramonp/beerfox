import { useQuery } from "react-query";
import getRandomBeer from "../api/getRandomBeer";
import { IBeerResponse } from "../types/beerResponse";
import { QUERY_RANDOM_BEER } from "./queryKeys";

export default function useGetRandomBeerQuery() {
  return useQuery([QUERY_RANDOM_BEER], async () => {
    const beer: IBeerResponse = await getRandomBeer();

    return beer;
  });
}
