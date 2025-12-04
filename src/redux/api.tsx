import { fetch } from "../libs/helpers";

// ***** THIS IS GENERAL API FILE ***** //
// General API functions that don't belong to a specific feature module

export const getCountryAPI = async ({
  queryParams,
  cache = true,
}: {
  queryParams?: any;
  cache?: boolean;
}): Promise<any> => {
  return fetch("/country", {
    method: "GET",
    queryParams,
    cache,
  });
};

export const getCountryStatesAPI = async ({
  countryName,
  queryParams,
  cache = true,
}: {
  countryName: string;
  queryParams?: any;
  cache?: boolean;
}): Promise<any> => {
  return fetch(`/country/${countryName}/state`, {
    method: "GET",
    queryParams,
    cache,
  });
};

