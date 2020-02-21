const {ORDERED_STATIONS, GENERATED_AT} = require("./_stationCache");

module.exports = (req, res) => {
  res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");
  res.setHeader("sz-station-data", GENERATED_AT);
  res.json({data: ORDERED_STATIONS, error: null});
};
