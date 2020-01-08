const {ORDERED_STATIONS, GENERATED_AT} = require("../lib/stationsCache");

module.exports = (req, res) => {
  res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");
  res.setHeader("sz-station-data", GENERATED_AT);
  res.json({stations: ORDERED_STATIONS});
};
