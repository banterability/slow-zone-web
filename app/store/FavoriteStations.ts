import LocalStorageCache from "./cache";

export type RecentStation = {
  lines: [string];
  id: number;
  title: string;
};

const cache = new LocalStorageCache("slow-zone:cache:favorite-stations");

export const getFavoriteStations = (): Array<RecentStation> =>
  cache.get().map((item) => {
    const { key, ...values } = item;
    return values;
  });

export const isFavorite = (stationId: number) =>
  Boolean(cache.get().find(({ key }) => key === stationId));

export const addFavoriteStation = (
  stationId: number,
  station: RecentStation
) => {
  cache.push(stationId, station);
};

export const removeFavoriteStation = (stationId: number) => {
  cache.delete(stationId);
};
