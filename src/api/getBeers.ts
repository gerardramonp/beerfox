import { AxiosResponse } from "axios";
import { IBeerResponse } from "../types/beerResponse";
import apiClient from "./apiClient";
import { API_LSIT_BEERS } from "./apiEndpoints";

export default async function getBeers(params?: any) {
  const beers: AxiosResponse<IBeerResponse[]> = await apiClient.get(
    API_LSIT_BEERS,
    { params },
  );

  return beers.data;
}
