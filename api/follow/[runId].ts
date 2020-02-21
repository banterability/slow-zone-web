import SlowZone from "slow-zone";
import {NowRequest, NowResponse} from "@now/node";

const client = new SlowZone({apiKey: process.env.CTA_API_KEY});

const getFollow = (req: NowRequest, res: NowResponse) => {
  client
    .followTrain(req.query)
    .then((data: [any]) => res.send({data, error: null}))
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

export default getFollow;
