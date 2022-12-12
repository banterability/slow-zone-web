import LocalStorageCache from "./cache";
import type { CachedStation } from "~/types/station";

const cache = new LocalStorageCache("slow-zone:cache:recent-stations");

export const getRecentStations = (): CachedStation[] =>
  cache
    .get()
    .slice()
    .reverse()
    .map((item) => {
      const { key, ...values } = item;
      return values;
    });

export const pushRecentStation = (
  stationId: number,
  station: CachedStation
) => {
  cache.push(stationId, station);
};
