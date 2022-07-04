import { UseQueryResult } from "react-query";
import { IBeerResponse } from "../types/beerResponse";

export default function useBeerTemplateVisibility(
  randomBeerQuery: UseQueryResult<IBeerResponse, unknown>,
  beer: IBeerResponse | null,
) {
  const isSkeletonVisible =
    !randomBeerQuery.isError &&
    (randomBeerQuery.isLoading || randomBeerQuery.isFetching);

  const isWarningVisible =
    !randomBeerQuery.isError &&
    !randomBeerQuery.isLoading &&
    !randomBeerQuery.isFetching &&
    !beer;

  const isBeerVisible =
    !randomBeerQuery.isError &&
    !randomBeerQuery.isLoading &&
    !randomBeerQuery.isFetching;

  return { isSkeletonVisible, isWarningVisible, isBeerVisible };
}
