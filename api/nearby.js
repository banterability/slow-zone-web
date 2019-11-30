const geolib = require("geolib");
const {ORDERED_STATIONS, STATION_LOCATIONS} = require("../lib/stationsCache");

const findStation = stationId =>
  ORDERED_STATIONS.find(station => station.id === parseInt(stationId, 10));

module.exports = (req, res) => {
  let {limit, latitude, longitude} = req.query;

  if (!latitude && !longitude) {
    return res.status(400).json({
      error: {
        message: "missing required parameters"
      }
    });
  }

  const userLocation = {latitude, longitude};
  limit = limit || 5;

  const nearestStations = geolib
    .orderByDistance(userLocation, STATION_LOCATIONS)
    .slice(0, limit)
    .map(result => {
      const station = findStation(result.stationId);
      const distance = geolib.getDistance(station.location, userLocation);

      return {
        ...station,
        distance: {
          feet: geolib.convertDistance(distance, "ft"),
          miles: geolib.convertDistance(distance, "mi")
        }
      };
    });

  res.send({stations: nearestStations});
};
