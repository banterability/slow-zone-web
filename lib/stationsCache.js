const {generatedAt, stations} = require("../data/stations.json");

const compareStations = (stationA, stationB) => {
  if (stationA.name < stationB.name) {
    return -1;
  } else if (stationA.name > stationB.name) {
    return 1;
  } else {
    return 0;
  }
};

// pre-sort a-z
const ORDERED_STATIONS = stations.sort(compareStations);

// precompute list of stations ids + coordinates
const STATION_LOCATIONS = stations.map(station => ({
  ...station.location,
  stationId: station.id
}));

module.exports = {
  GENERATED_AT: generatedAt,
  ORDERED_STATIONS,
  STATION_LOCATIONS
};
