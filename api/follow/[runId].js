require("../_sentry");

const SlowZone = require("slow-zone");

const client = new SlowZone({apiKey: process.env.CTA_API_KEY});

module.exports = (req, res) => {
  const {runId} = req.query;

  client
    .followTrain(runId)
    .then((data) => res.send({data, error: null}))
    .catch((err) => {
      res.status(500).json([
        {
          data: [],
          error: {
            message: err.toString(),
          },
        },
      ]);
    });
};
