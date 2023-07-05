import LocalStorageCache from "./cache";

import type { CachedStation } from "~/types/cache";

const cache = new LocalStorageCache("slow-zone:cache:favorite-stations");

export const getFavoriteStations = (): CachedStation[] =>
  cache.get().map((item) => {
    const { key, ...values } = item;
    return values;
  });

export const isFavorite = (stationId: number) =>
  Boolean(cache.get().find(({ key }) => key === stationId));

export const addFavoriteStation = (
  stationId: number,
  station: CachedStation,
) => {
  cache.push(stationId, station);
};

export const removeFavoriteStation = (stationId: number) => {
  cache.delete(stationId);
};
