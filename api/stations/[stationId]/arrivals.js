const SlowZone = require("slow-zone");

const client = new SlowZone({apiKey: process.env.CTA_API_KEY});

module.exports = (req, res) => {
  const {stationId} = req.query;

  client
    .getArrivalsForStation(stationId)
    .then(arrivals => {
      res.send(arrivals);
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: err.toString()
        }
      });
    });
};
