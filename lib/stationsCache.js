const stationData = require("../data/stations.json").stations;

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
const ORDERED_STATIONS = stationData.sort(compareStations);

// precompute list of stations ids + coordinates
const STATION_LOCATIONS = stationData.map(station => ({
  ...station.location,
  stationId: station.id
}));

module.exports = {
  ORDERED_STATIONS,
  STATION_LOCATIONS
};
