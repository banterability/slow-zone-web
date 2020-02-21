import {generatedAt, stations} from '../data/stations.json';

const compareStations = (stationA, stationB) => {
  if (stationA.name < stationB.name) {
    return -1;
  } else if (stationA.name > stationB.name) {
    return 1;
  } else {
    return 0;
  }
};

export const GENERATED_AT = generatedAt;

// pre-sort a-z
export const ORDERED_STATIONS = stations.sort(compareStations);

// precompute list of stations ids + coordinates
export const STATION_LOCATIONS = stations.map(station => ({
  ...station.location,
  stationId: station.id
}));

export const findStation = (stationId: string | string[]) =>
  ORDERED_STATIONS.find(station => station.id === parseInt(<string>stationId, 10));