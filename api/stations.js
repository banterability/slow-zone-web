const stations = require("../lib/stationsCache").ORDERED_STATIONS;

// todo: caching headers
module.exports = (req, res) => {
  res.json({stations});
};
