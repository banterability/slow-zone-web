import {GENERATED_AT, ORDERED_STATIONS} from "./_stationCache";

export default (req, res) => {
  res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");
  res.setHeader("sz-station-data", GENERATED_AT);

  res.json({data: ORDERED_STATIONS, error: null});
};
