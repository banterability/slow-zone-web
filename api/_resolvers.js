const {ORDERED_STATIONS, GENERATED_AT} = require("../lib/stationsCache");

const resolvers = {
  Query: {
    stations: (parent, args, context, info) => ORDERED_STATIONS,
    station: (parent, args, context, info) =>
      ORDERED_STATIONS.find(station => station.id === args.id)
  }
};

module.exports = resolvers;
