const geolib = require("geolib");
const {ORDERED_STATIONS, STATION_LOCATIONS} = require("./_stationCache");

const findStation = stationId =>
  ORDERED_STATIONS.find(station => station.id === parseInt(stationId, 10));

module.exports = (req, res) => {
  let {count, latitude, longitude} = req.query;

  if (!latitude && !longitude) {
    return res.status(400).json({
      error: {
        message: "missing required parameters"
      }
    });
  }

  const userLocation = {latitude, longitude};

  const nearestStations = geolib
    .orderByDistance(userLocation, STATION_LOCATIONS)
    .slice(0, count || 5)
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

  res.send(nearestStations);
};
