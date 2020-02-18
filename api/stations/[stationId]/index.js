const {GENERATED_AT, ORDERED_STATIONS} = require("../../_stationCache");

const findStation = stationId =>
  ORDERED_STATIONS.find(station => station.id === parseInt(stationId, 10));

module.exports = (req, res) => {
  const {stationId} = req.query;
  const station = findStation(stationId);

  if (station) {
    res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("sz-station-data", GENERATED_AT);
    return res.send(station);
  } else {
    return res.status(404).send({
      error: {
        status: 404,
        message: `No station found with id ${stationId}`
      }
    });
  }
};
