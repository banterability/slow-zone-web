import {NowResponse, NowRequest} from "@now/node";
import {GENERATED_AT, ORDERED_STATIONS} from "../../_stationCache";

const findStation = stationId =>
  ORDERED_STATIONS.find(station => station.id === parseInt(stationId, 10));

const getStation = (req: NowRequest, res: NowResponse) => {
  const {stationId} = req.query;
  const station = findStation(stationId);

  if (station) {
    res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");
    res.setHeader("sz-station-data", GENERATED_AT);

    return res.send({data: station, error: null});
  } else {
    return res.status(404).send({
      data: {},
      error: {
        status: 404,
        message: `No station found with id ${stationId}`
      }
    });
  }
};

export default getStation;
