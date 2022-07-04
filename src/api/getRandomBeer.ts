import { AxiosResponse } from "axios";
import { IBeerResponse } from "../types/beerResponse";
import apiClient from "./apiClient";
import { API_RANDOM_BEER } from "./apiEndpoints";

export default async function getRandomBeer() {
  const beer: AxiosResponse<IBeerResponse[]> = await apiClient.get(
    API_RANDOM_BEER,
  );

  return beer.data[0];
}
