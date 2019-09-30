// @flow
import LocalStorageCache from "./cache";
import {FAVORITE_STATIONS_KEY} from "./constants";
import type {RecentStation} from "../types";

const cache = new LocalStorageCache(FAVORITE_STATIONS_KEY);

export const getFavoriteStations = (): Array<RecentStation> =>
  cache.get().map(item => {
    const {key, ...values} = item;
    return values;
  });

export const isFavorite = (stationId: number) =>
  Boolean(cache.get().find(({key}) => key === stationId));

export const addFavoriteStation = (
  stationId: number,
  station: RecentStation
) => {
  cache.push(stationId, station);
};

export const removeFavoriteStation = (stationId: number) => {
  cache.delete(stationId);
};
