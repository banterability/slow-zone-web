import { Station } from "~/types/station";
import { stations } from "./stations.json";

function compareStations(stationA: Station, stationB: Station): number {
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
}

export const ORDERED_STATIONS = stations.sort(compareStations);

export const STATION_LOCATIONS = stations.map((station) => ({
  ...station.location,
  stationId: station.id,
}));
