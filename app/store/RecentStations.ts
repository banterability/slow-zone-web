import LocalStorageCache from "./cache";
import { RecentStation } from "./FavoriteStations";

const cache = new LocalStorageCache("slow-zone:cache:recent-stations");

export const getRecentStations = (): [RecentStation] =>
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
  station: RecentStation
) => {
  cache.push(stationId, station);
};
