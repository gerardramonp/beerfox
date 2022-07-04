import { UseQueryResult } from "react-query";
import { IBeerResponse } from "../types/beerResponse";

export default function useBeerListTemplateVisibility(
  getBeersQuery: UseQueryResult<IBeerResponse[] | null, unknown>,
) {
  const isLoadingVisible =
    !getBeersQuery.isError &&
    (getBeersQuery.isLoading || getBeersQuery.isFetching);

  const isWarningVisible =
    !getBeersQuery.error &&
    !getBeersQuery.isLoading &&
    getBeersQuery.data?.length === 0;

  const isListVisible =
    !getBeersQuery.error && !getBeersQuery.isLoading && getBeersQuery.data;

  return {
    isLoadingVisible,
    isWarningVisible,
    isListVisible,
  };
}
