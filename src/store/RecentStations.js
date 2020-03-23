// @flow
import LocalStorageCache from "./cache";
import {RECENT_STATIONS_KEY} from "./constants";
import type {RecentStation} from "../types";

const cache = new LocalStorageCache(RECENT_STATIONS_KEY);

export const getRecentStations = (): Array<RecentStation> =>
  cache
    .get()
    .slice()
    .reverse()
    .map((item) => {
      const {key, ...values} = item;
      return values;
    });

export const pushRecentStation = (
  stationId: number,
  station: RecentStation
) => {
  cache.push(stationId, station);
};
