import { stations } from "./stations.json";

export type StationLocation = {
  latitude: number;
  longitude: number;
  stationId: number;
};

export const ORDERED_STATIONS = stations.sort((stationA, stationB) => {
  if (stationA.name < stationB.name) {
    return -1;
  } else if (stationA.name > stationB.name) {
    return 1;
  } else {
    if (stationA.id < stationB.id) {
      return -1;
    } else if (stationA.id > stationB.id) {
      return 1;
    }
  }
  return 0;
});

export const STATION_LOCATIONS: StationLocation[] = stations.map((station) => ({
  ...station.location,
  stationId: station.id,
}));
