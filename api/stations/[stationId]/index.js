const {ORDERED_STATIONS} = require("../../../lib/stationsCache");

const findStation = stationId =>
  ORDERED_STATIONS.find(station => station.id === parseInt(stationId, 10));

module.exports = (req, res) => {
  const {stationId} = req.query;

  const station = findStation(stationId);
  if (station) {
    // todo: caching headers
    return res.send({
      station: station
    });
  } else {
    return res.status(404).send({
      error: {
        status: 404,
        message: `No station found with id ${stationId}`
      }
    });
  }
};
