import SlowZone from "slow-zone";
import {NowRequest, NowResponse} from "@now/node";

const client = new SlowZone({apiKey: process.env.CTA_API_KEY});

const getArrivals = (req: NowRequest, res: NowResponse) => {
  client
    .getArrivalsForStation(req.query)
    .then(arrivals => {
      res.send({data: arrivals, error: null});
    })
    .catch((err: Error) => {
      res.status(500).json([
        {
          data: [],
          error: {
            message: err.toString()
          }
        }
      ]);
    });
};

export default getArrivals;
